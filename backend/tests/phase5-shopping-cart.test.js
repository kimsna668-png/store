const http = require('http');
const app = require('../src/server');

async function runPhase5Tests() {
  console.log('==================================================');
  console.log('🧪 RUNNING PHASE 5: SHOPPING CART TEST SUITE');
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
  const testSessionId = `test-session-${Date.now()}`;

  const request = (method, path, body = null) => {
    return new Promise((resolve, reject) => {
      const dataStr = body ? JSON.stringify(body) : null;
      const reqHeaders = {
        'Content-Type': 'application/json',
        'x-session-id': testSessionId
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

  // Test 1: GET /api/cart (Initial empty cart)
  const initCart = await request('GET', '/api/cart');
  assert(initCart.statusCode === 200, `GET /api/cart returned HTTP 200 (Got: ${initCart.statusCode})`);
  assert(Array.isArray(initCart.data?.data?.cart?.items), 'Cart items is an array');

  // Test 2: POST /api/cart/items (Add Digital Product 2)
  const addRes = await request('POST', '/api/cart/items', {
    productId: 'prod-1',
    variantId: 'var-1',
    quantity: 1
  });
  assert(addRes.statusCode === 201, `POST /api/cart/items returned HTTP 201 (Got: ${addRes.statusCode})`);
  const cart = addRes.data?.data?.cart;
  assert(cart?.items?.length === 1, 'Cart now contains 1 item');
  assert(cart?.subtotal === 15.00, `Cart subtotal matches $15.00 (Got: $${cart?.subtotal})`);
  const itemId = cart?.items?.[0]?.id;

  // Test 3: PUT /api/cart/items/:id (Update quantity to 2)
  const updateRes = await request('PUT', `/api/cart/items/${itemId}`, {
    quantity: 2
  });
  assert(updateRes.statusCode === 200, 'Update quantity returned HTTP 200');
  const updatedCart = updateRes.data?.data?.cart;
  assert(updatedCart?.subtotal === 30.00, `Updated subtotal is $30.00 for 2 units (Got: $${updatedCart?.subtotal})`);

  // Test 4: POST /api/cart/apply-coupon (Apply 10% coupon NAVA10)
  const couponRes = await request('POST', '/api/cart/apply-coupon', {
    code: 'NAVA10'
  });
  assert(couponRes.statusCode === 200, 'Apply coupon NAVA10 returned HTTP 200');
  const discountedCart = couponRes.data?.data?.cart;
  assert(discountedCart?.discount === 3.00, `10% discount on $30 is $3.00 (Got: $${discountedCart?.discount})`);
  assert(discountedCart?.total === 27.00, `Final total is $27.00 (Got: $${discountedCart?.total})`);

  // Test 5: Reject Invalid Coupon Code
  const badCoupon = await request('POST', '/api/cart/apply-coupon', {
    code: 'FAKE_COUPON_CODE_99'
  });
  assert(badCoupon.statusCode === 400, `Invalid coupon rejected with HTTP 400 (Got: ${badCoupon.statusCode})`);

  // Test 6: DELETE /api/cart/remove-coupon
  const removeCouponRes = await request('DELETE', '/api/cart/remove-coupon');
  assert(removeCouponRes.statusCode === 200, 'Remove coupon returned HTTP 200');
  assert(removeCouponRes.data?.data?.cart?.discount === 0, 'Discount returned to $0 after coupon removal');

  // Test 7: DELETE /api/cart/items/:id (Remove item)
  const removeItemRes = await request('DELETE', `/api/cart/items/${itemId}`);
  assert(removeItemRes.statusCode === 200, 'Remove item returned HTTP 200');
  assert(removeItemRes.data?.data?.cart?.items?.length === 0, 'Cart item removed successfully');

  // Test 8: Re-add and Clear Cart
  await request('POST', '/api/cart/items', { productId: 'prod-2', quantity: 1 });
  const clearRes = await request('DELETE', '/api/cart');
  assert(clearRes.statusCode === 200, 'Clear cart returned HTTP 200');
  assert(clearRes.data?.data?.cart?.items?.length === 0, 'Cart completely cleared');

  server.close();

  console.log('--------------------------------------------------');
  console.log(`PHASE 5 SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log('==================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runPhase5Tests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

