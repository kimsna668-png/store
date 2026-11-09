const http = require('http');
const app = require('../src/server');
const { execSync } = require('child_process');
const path = require('path');

async function runSecuritySuite() {
  console.log('==================================================');
  console.log('🛡️ RUNNING PHASE 11: SECURITY & RESILIENCE AUDIT');
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

  const request = (method, reqPath, headers = {}) => {
    return new Promise((resolve, reject) => {
      const req = http.request(`${baseUrl}${reqPath}`, {
        method,
        headers
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
      });
      req.on('error', reject);
      req.end();
    });
  };

  // 1. Helmet Security Headers Check
  const healthCheck = await request('GET', '/api/health');
  assert(healthCheck.headers['x-content-type-options'] === 'nosniff', 'X-Content-Type-Options: nosniff header enforced');
  assert(healthCheck.headers['x-frame-options'] === 'SAMEORIGIN' || healthCheck.headers['cross-origin-resource-policy'], 'Cross-origin or framing protection enabled');

  // 2. JWT Tampering Protection Check
  const forgedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmb3JnZWQtYWRtaW4iLCJyb2xlIjoiU1VQRVJfQURNSU4ifQ.InVaLiD_SiGnAtUrE_999999999999999999999';
  const tamperRes = await request('GET', '/api/auth/me', {
    'Authorization': `Bearer ${forgedToken}`
  });
  assert(tamperRes.statusCode === 403, `Tampered JWT signature strictly rejected with HTTP 403 (Got: ${tamperRes.statusCode})`);

  // 3. Prevent Privilege Escalation Check
  const customerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjdXN0LTEiLCJyb2xlIjoiQ1VTVE9NRVIifQ.fake';
  const privRes = await request('GET', '/api/auth/admin-check', {
    'Authorization': `Bearer ${customerToken}`
  });
  assert(privRes.statusCode === 403, 'Unauthenticated or non-admin user rejected from admin routes');

  // 4. Rate Limiting Headers Check
  assert(Boolean(healthCheck.headers['ratelimit-limit'] || healthCheck.headers['x-ratelimit-limit']), 'Rate limiting headers present on API endpoints');

  server.close();

  console.log('--------------------------------------------------');
  console.log(`SECURITY SUITE SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log('==================================================\n');

  return { passed, failed };
}

async function runMasterTestHarness() {
  console.log('\n============================================================');
  console.log('🚀 NAVASEALSTORE CLONE PRO — MASTER AUTOMATED TEST HARNESS');
  console.log('============================================================\n');

  const testFiles = [
    'phase1-foundation.test.js',
    'phase2-reference-ui.test.js',
    'phase3-auth.test.js',
    'phase4-product-management.test.js',
    'phase5-shopping-cart.test.js',
    'phase6-7-payments-delivery.test.js',
    'phase10-telegram.test.js'
  ];

  let totalSuites = testFiles.length + 1;
  let suitesPassed = 0;

  for (const file of testFiles) {
    const fullPath = path.join(__dirname, file);
    try {
      execSync(`node "${fullPath}"`, { stdio: 'inherit' });
      suitesPassed++;
    } catch (err) {
      console.error(`❌ Suite failed: ${file}`);
    }
  }

  const secResults = await runSecuritySuite();
  if (secResults.failed === 0) {
    suitesPassed++;
  }

  console.log('============================================================');
  console.log(`🎉 FINAL TEST RESULTS: ${suitesPassed} / ${totalSuites} TEST SUITES PASSED`);
  console.log('============================================================\n');

  if (suitesPassed < totalSuites) {
    process.exit(1);
  }
}

runMasterTestHarness();

