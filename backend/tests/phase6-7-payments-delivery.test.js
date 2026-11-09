const http = require('http');
const app = require('../src/server');

async function runPhase6And7Tests() {
  console.log('==================================================================');
  console.log('🧪 RUNNING PHASE 6 & 7: PAYMENT INTEGRATION & AUTOMATIC DELIVERY');
  console.log('==================================================================');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${message}`);
      failed++;
    }
  }

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;

  const request = (method, path, body = null, headers = {}) => {
    return new Promise((resolve, reject) => {
      const dataStr = body ? JSON.stringify(body) : null;
      const reqHeaders = {
        'Content-Type': 'application/json',
        ...headers
      };
      if (dataStr) {
        reqHeaders['Content-Length'] = Buffer.byteLength(dataStr);
      }

      const req = http.request(`${baseUrl}${path}`, {
        method,
        headers: reqHeaders
      }, (res) => {
        let respData = '';
        res.on('data', chunk => respData += chunk);
        res.on('end', () => {
          try {
            resolve({
              statusCode: res.statusCode,
              data: respData ? JSON.parse(respData) : null,
              raw: respData
            });
          } catch (e) {
            resolve({ statusCode: res.statusCode, raw: respData });
          }
        });
      });

      req.on('error', reject);
      if (dataStr) req.write(dataStr);
      req.end();
    });
  };

  // Test 1: Create an Order
  const orderRes = await request('POST', '/api/orders', {
    customerName: 'Dara Chamnan',
    customerEmail: 'dara.chamnan@gmail.com',
    customerPhone: '+85512998877',
    telegramUsername: '@darachamnan',
    items: [
      {
        productId: 'prod-1',
        productTitle: 'Digital Product 2 - AI Automated Video Suite',
        variantTitle: 'Standard Personal License',
        slug: 'digital-product-2',
        unitPrice: 15.00,
        quantity: 1,
        deliveryType: 'INSTANT_FILE'
      }
    ],
    subtotal: 15.00,
    discountTotal: 0,
    totalAmount: 15.00,
    currency: 'USD'
  });

  assert(orderRes.statusCode === 201, `Order creation returned HTTP 201 (Got: ${orderRes.statusCode})`);
  const order = orderRes.data?.data?.order;
  assert(order?.orderNumber.startsWith('NVS-'), `Order number format is NVS-YYYYMMDD-XXXX (Got: ${order?.orderNumber})`);
  assert(order?.status === 'AWAITING_PAYMENT', 'Initial order status is AWAITING_PAYMENT');

  // Test 2: Generate Bakong KHQR
  const khqrRes = await request('POST', '/api/payments/khqr/generate', {
    orderNumber: order.orderNumber,
    amount: 15.00,
    currency: 'USD'
  });
  assert(khqrRes.statusCode === 200, 'KHQR generate returned HTTP 200');
  const khqr = khqrRes.data?.data;
  assert(Boolean(khqr?.qrString), 'Generated official EMVCo KHQR string');
  assert(khqr?.qrString.startsWith('000201'), 'KHQR string starts with standard format indicator (000201)');
  assert(Boolean(khqr?.deepLink), `Generated mobile deep link (Got: ${khqr?.deepLink})`);

  // Test 3: Create Payment Session for KHQR
  const sessionRes = await request('POST', '/api/payments/create-session', {
    orderId: order.id,
    paymentMethod: 'KHQR_BAKONG'
  });
  assert(sessionRes.statusCode === 200, 'Create KHQR payment session returned HTTP 200');
  const sessionData = sessionRes.data?.data;
  const transactionRef = sessionData?.transactionRef;
  assert(Boolean(transactionRef), `Received unique transaction reference: ${transactionRef}`);

  // Test 4: Create Stripe Payment Session
  const stripeRes = await request('POST', '/api/payments/create-session', {
    orderId: order.id,
    paymentMethod: 'STRIPE'
  });
  assert(stripeRes.statusCode === 200, 'Create Stripe payment session returned HTTP 200');
  assert(stripeRes.data?.method === 'STRIPE', 'Session method is STRIPE');

  // Test 5: Server-side Payment Verification & Automatic Digital Delivery
  const verifyRes = await request('POST', '/api/payments/verify', {
    orderId: order.id,
    paymentMethod: 'KHQR_BAKONG',
    transactionRef: transactionRef
  });
  assert(verifyRes.statusCode === 200, `Payment verification returned HTTP 200 (Got: ${verifyRes.statusCode})`);
  const verifyData = verifyRes.data?.data;
  assert(verifyData?.order?.status === 'DELIVERED', `Order status auto-updated to DELIVERED (Got: ${verifyData?.order?.status})`);
  assert(Array.isArray(verifyData?.entitlements) && verifyData.entitlements.length > 0, 'Instant delivery entitlement created');
  const entitlement = verifyData?.entitlements?.[0];
  const downloadToken = entitlement?.downloadToken;
  assert(Boolean(downloadToken), `Generated secure signed download token: ${downloadToken}`);

  // Test 6: Duplicate Payment Prevention
  const dupVerify = await request('POST', '/api/payments/verify', {
    orderId: order.id,
    paymentMethod: 'KHQR_BAKONG',
    transactionRef: transactionRef
  });
  assert(dupVerify.statusCode === 400, `Duplicate transaction rejected with HTTP 400 (Got: ${dupVerify.statusCode})`);
  assert(dupVerify.data?.message?.includes('Duplicate'), 'Rejection message cites duplicate transaction');

  // Test 7: Verify and Download File with Signed Token
  const downloadRes = await request('GET', `/api/downloads/${downloadToken}`);
  assert(downloadRes.statusCode === 200, `Download file returned HTTP 200 (Got: ${downloadRes.statusCode})`);
  assert(downloadRes.raw.includes('NavasealStore Pro'), 'Received authentic verified digital payload');

  // Test 8: Download Info & Quota Tracker
  const infoRes = await request('GET', `/api/downloads/info/${downloadToken}`);
  assert(infoRes.statusCode === 200, 'Download info endpoint returned HTTP 200');
  assert(infoRes.data?.data?.downloadCount === 1, `Download count incremented to 1 (Got: ${infoRes.data?.data?.downloadCount})`);
  assert(infoRes.data?.data?.downloadsRemaining === 9, `Remaining downloads quota accurately tracked (Got: ${infoRes.data?.data?.downloadsRemaining})`);

  // Test 9: Reject Download with Invalid Token
  const badDownload = await request('GET', '/api/downloads/INVALID_FAKE_TOKEN_999');
  assert(badDownload.statusCode === 403, `Invalid download token rejected with HTTP 403 (Got: ${badDownload.statusCode})`);

  // Test 10: Payment Transaction Audit Lookup
  const txnRes = await request('GET', `/api/payments/${transactionRef}`);
  assert(txnRes.statusCode === 200, 'Transaction status lookup returned HTTP 200');
  assert(txnRes.data?.data?.payment?.status === 'PAID', 'Transaction payment status is PAID');
  assert(Array.isArray(txnRes.data?.data?.auditEvents), 'Payment audit trail recorded');

  server.close();

  console.log('------------------------------------------------------------------');
  console.log(`PHASE 6 & 7 SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log('==================================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runPhase6And7Tests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

