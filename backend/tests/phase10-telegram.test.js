const http = require('http');
const app = require('../src/server');

async function runPhase10Tests() {
  console.log('==================================================');
  console.log('🧪 RUNNING PHASE 10: TELEGRAM BOT TEST SUITE');
  console.log('==================================================');

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
              data: respData ? JSON.parse(respData) : null
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

  // Test 1: Telegram Webhook /start command
  const startRes = await request('POST', '/api/telegram/webhook', {
    update_id: 10001,
    message: {
      message_id: 1,
      from: { id: 987654321, first_name: 'Visal' },
      chat: { id: 987654321, type: 'private' },
      text: '/start'
    }
  });

  assert(startRes.statusCode === 200, `POST /api/telegram/webhook returned HTTP 200 (Got: ${startRes.statusCode})`);
  const startReply = startRes.data?.reply;
  assert(startReply?.text.includes('Welcome to Nava Seal Store Pro Bot'), 'Welcome reply contains brand greeting');
  assert(startReply?.text.includes('ទិញអាជ្ញាប័ណ្ណ'), 'Welcome reply contains Khmer typography greeting');

  // Test 2: Telegram Webhook /products command
  const prodRes = await request('POST', '/api/telegram/webhook', {
    update_id: 10002,
    message: {
      message_id: 2,
      chat: { id: 987654321 },
      text: '/products'
    }
  });
  assert(prodRes.statusCode === 200, 'POST /api/telegram/webhook with /products returned HTTP 200');
  const prodReply = prodRes.data?.reply;
  assert(prodReply?.text.includes('Digital Product 2'), 'Product reply lists reference item');

  // Test 3: Create an order and lookup via /order command
  const orderRes = await request('POST', '/api/orders', {
    customerName: 'Sokha Rith',
    customerEmail: 'sokha.rith@gmail.com',
    items: [
      {
        productId: 'prod-1',
        productTitle: 'Digital Product 2',
        unitPrice: 15.00,
        quantity: 1
      }
    ],
    subtotal: 15.00,
    totalAmount: 15.00
  });
  const orderNumber = orderRes.data?.data?.order?.orderNumber;

  const orderLookupRes = await request('POST', '/api/telegram/webhook', {
    update_id: 10003,
    message: {
      message_id: 3,
      chat: { id: 987654321 },
      text: `/order ${orderNumber}`
    }
  });
  assert(orderLookupRes.statusCode === 200, 'POST /api/telegram/webhook with /order returned HTTP 200');
  assert(orderLookupRes.data?.reply?.text.includes(orderNumber), 'Order lookup returns order number');
  assert(orderLookupRes.data?.reply?.text.includes('Sokha Rith'), 'Order lookup returns customer name');

  // Test 4: Telegram Webhook /support command
  const supportRes = await request('POST', '/api/telegram/webhook', {
    update_id: 10004,
    message: {
      message_id: 4,
      chat: { id: 987654321 },
      text: '/support'
    }
  });
  assert(supportRes.statusCode === 200, 'Support command returned HTTP 200');
  assert(supportRes.data?.reply?.text.includes('@navaseal'), 'Support response refers to @navaseal handle');

  // Test 5: Admin Test Notification Dispatcher
  const testNotifRes = await request('POST', '/api/telegram/send-test');
  assert(testNotifRes.statusCode === 200, 'Admin test notification returned HTTP 200');
  assert(Boolean(testNotifRes.data?.telegramPayload), 'Telegram admin notification payload generated');

  server.close();

  console.log('--------------------------------------------------');
  console.log(`PHASE 10 SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log('==================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runPhase10Tests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

