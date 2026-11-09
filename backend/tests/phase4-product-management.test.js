const http = require('http');
const app = require('../src/server');

async function runPhase4Tests() {
  console.log('==================================================');
  console.log('🧪 RUNNING PHASE 4: PRODUCT MANAGEMENT TEST SUITE');
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

  // Obtain Admin Token for protected tests
  const adminLogin = await request('POST', '/api/auth/login', {
    email: 'admin@navaseal.site',
    password: 'Admin123!'
  });
  const adminToken = adminLogin.data?.data?.token;
  assert(Boolean(adminToken), 'Obtained admin bearer token for product management');

  // Test 1: GET /api/products (List all products)
  const listRes = await request('GET', '/api/products');
  assert(listRes.statusCode === 200, `GET /api/products returned HTTP 200 (Got: ${listRes.statusCode})`);
  assert(Array.isArray(listRes.data?.data?.products), 'Products list is an array');
  assert(listRes.data?.data?.products?.length > 0, `Products array is populated (Count: ${listRes.data?.data?.products?.length})`);

  // Test 2: Search products via query string ?search=AI
  const searchRes = await request('GET', '/api/products?search=AI');
  assert(searchRes.statusCode === 200, 'Search endpoint returned HTTP 200');
  const hasAIMatch = searchRes.data?.data?.products.some(p => p.title.toLowerCase().includes('ai'));
  assert(hasAIMatch, 'Search query returned matching product');

  // Test 3: Filter products by category ?category=ai-tools
  const catFilterRes = await request('GET', '/api/products?category=ai-tools');
  assert(catFilterRes.statusCode === 200, 'Category filter endpoint returned HTTP 200');
  assert(catFilterRes.data?.data?.products?.length > 0, 'Found products in ai-tools category');

  // Test 4: Fetch reference product GET /api/products/digital-product-2
  const slugRes = await request('GET', '/api/products/digital-product-2');
  assert(slugRes.statusCode === 200, 'GET /api/products/digital-product-2 returned HTTP 200');
  const dp2 = slugRes.data?.data?.product;
  assert(dp2?.slug === 'digital-product-2', 'Product slug matches digital-product-2');
  assert(Boolean(dp2?.titleKhmer), 'Product contains Khmer title');
  assert(Array.isArray(dp2?.variants), 'Product contains variants array');
  assert(Array.isArray(slugRes.data?.data?.related), 'Related products array returned');

  // Test 5: GET /api/categories (List all categories)
  const categoriesRes = await request('GET', '/api/categories');
  assert(categoriesRes.statusCode === 200, 'GET /api/categories returned HTTP 200');
  assert(categoriesRes.data?.data?.categories?.length >= 5, `Categories list contains at least 5 categories (Got: ${categoriesRes.data?.data?.categories?.length})`);

  // Test 6: Create Category (Admin Only)
  const newCatRes = await request('POST', '/api/categories', {
    name: 'Automation Bots & Scripts',
    nameKhmer: 'ស្គ្រីប និងបូតស្វ័យប្រវត្តិ',
    description: 'Telegram bots, Discord automation tools, and scrapers'
  }, { 'Authorization': `Bearer ${adminToken}` });
  assert(newCatRes.statusCode === 201, `Create category returned HTTP 201 (Got: ${newCatRes.statusCode})`);
  const createdCatId = newCatRes.data?.data?.category?.id;

  // Test 7: Reject Create Product without Token
  const unauthProd = await request('POST', '/api/products', {
    title: 'Unauthorized Test Product',
    price: 19.99,
    categoryId: 'cat-1'
  });
  assert(unauthProd.statusCode === 401, `Unauthenticated product creation rejected with HTTP 401 (Got: ${unauthProd.statusCode})`);

  // Test 8: Create Product (Admin Only)
  const newProdRes = await request('POST', '/api/products', {
    title: 'Telegram Auto Broadcaster Pro 2026',
    titleKhmer: 'កម្មវិធីផ្ញើសារ Telegram ស្វ័យប្រវត្តិ ២០២៦',
    slug: 'telegram-auto-broadcaster-pro',
    categoryId: createdCatId || 'cat-1',
    price: 29.00,
    comparePrice: 59.00,
    deliveryType: 'INSTANT_FILE',
    instantContent: 'TG-BROADCASTER-PRO-ACTIVATION-KEY',
    shortDescription: 'High-speed mass message delivery tool for Telegram channels and groups.',
    description: 'Powerful desktop automation script for broadcasting announcements safely on Telegram.',
    isAvailable: true,
    isFeatured: true,
    variants: [
      { id: 'v-tg-1', title: 'Single PC Activation', price: 29.00 }
    ]
  }, { 'Authorization': `Bearer ${adminToken}` });
  assert(newProdRes.statusCode === 201, `Create product returned HTTP 201 (Got: ${newProdRes.statusCode})`);
  const createdProdId = newProdRes.data?.data?.product?.id;

  // Test 9: Update Product (Admin Only)
  const updateRes = await request('PUT', `/api/products/${createdProdId}`, {
    price: 35.00,
    shortDescription: 'Updated high-speed mass message delivery tool.'
  }, { 'Authorization': `Bearer ${adminToken}` });
  assert(updateRes.statusCode === 200, `Update product returned HTTP 200 (Got: ${updateRes.statusCode})`);
  assert(updateRes.data?.data?.product?.price === 35, 'Product price successfully updated to $35');

  // Test 10: Delete Product (Admin Only)
  const deleteRes = await request('DELETE', `/api/products/${createdProdId}`, null, {
    'Authorization': `Bearer ${adminToken}`
  });
  assert(deleteRes.statusCode === 200, `Delete product returned HTTP 200 (Got: ${deleteRes.statusCode})`);

  // Verify deleted product is no longer returned
  const checkDeleted = await request('GET', `/api/products/id/${createdProdId}`);
  assert(checkDeleted.statusCode === 404, 'Deleted product returns HTTP 404 on subsequent lookup');

  server.close();

  console.log('--------------------------------------------------');
  console.log(`PHASE 4 SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log('==================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runPhase4Tests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

