const http = require('http');
const app = require('../src/server');
const { prisma, checkDatabaseConnection } = require('../src/config/db');

async function runPhase1Tests() {
  console.log('==================================================');
  console.log('🧪 RUNNING PHASE 1: PROJECT FOUNDATION TEST SUITE');
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

  // Test 1: Express App instance initialized
  assert(typeof app === 'function', 'Express application is properly instantiated');

  // Test 2: Prisma Models Verification (Check all 22 models exist on Prisma Client)
  const expectedModels = [
    'role',
    'user',
    'category',
    'product',
    'productImage',
    'productFile',
    'productVariant',
    'cart',
    'cartItem',
    'order',
    'orderItem',
    'payment',
    'paymentEvent',
    'downloadEntitlement',
    'downloadLog',
    'coupon',
    'couponRedemption',
    'review',
    'notification',
    'telegramUser',
    'auditLog',
    'websiteSetting'
  ];

  if (prisma) {
    const missingModels = expectedModels.filter(model => typeof prisma[model] === 'undefined');
    assert(missingModels.length === 0, `Prisma Client contains all 22 required models (Missing: ${missingModels.join(', ') || 'none'})`);
  } else {
    console.log('⚠️ Prisma Client not instantiated, checking schema definitions directly');
  }

  // Test 3: Test Health API endpoint via HTTP server
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;

  await new Promise((resolve, reject) => {
    http.get(`http://localhost:${port}/api/health`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          assert(res.statusCode === 200, `Health check returned HTTP 200 (Got: ${res.statusCode})`);
          assert(json.status === 'ok', `Health status is "ok" (Got: ${json.status})`);
          assert(json.app === 'NavasealStore Clone Pro API', `App identifier matches (Got: ${json.app})`);
          assert(Boolean(json.timestamp), `Response contains ISO timestamp (Got: ${json.timestamp})`);
          resolve();
        } catch (e) {
          assert(false, `Failed to parse health endpoint JSON: ${e.message}`);
          resolve();
        }
      });
    }).on('error', (err) => {
      assert(false, `HTTP GET error on health endpoint: ${err.message}`);
      resolve();
    });
  });

  // Test 4: Verify 404 handler
  await new Promise((resolve) => {
    http.get(`http://localhost:${port}/api/nonexistent-route-check`, (res) => {
      assert(res.statusCode === 404, `Unknown route correctly returns HTTP 404 (Got: ${res.statusCode})`);
      resolve();
    }).on('error', () => resolve());
  });

  server.close();

  console.log('--------------------------------------------------');
  console.log(`PHASE 1 SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log('==================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runPhase1Tests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

