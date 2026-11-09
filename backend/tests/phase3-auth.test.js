const http = require('http');
const app = require('../src/server');

async function runPhase3Tests() {
  console.log('==================================================');
  console.log('🧪 RUNNING PHASE 3: AUTHENTICATION & RBAC TEST SUITE');
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

  const testUser = {
    fullName: 'Test Automation Customer',
    email: `tester_${Date.now()}@navaseal.site`,
    password: 'SecurePassword123!'
  };

  let customerToken = null;
  let adminToken = null;

  // Test 1: User Registration
  const regRes = await request('POST', '/api/auth/register', testUser);
  assert(regRes.statusCode === 201, `Registration returned HTTP 201 (Got: ${regRes.statusCode})`);
  assert(regRes.data?.status === 'success', 'Registration status is success');
  assert(Boolean(regRes.data?.data?.token), 'Registration returns JWT token');
  customerToken = regRes.data?.data?.token;

  // Test 2: Reject Duplicate Email Registration
  const dupRes = await request('POST', '/api/auth/register', testUser);
  assert(dupRes.statusCode === 409, `Duplicate registration rejected with HTTP 409 (Got: ${dupRes.statusCode})`);

  // Test 3: Customer Login
  const loginRes = await request('POST', '/api/auth/login', {
    email: testUser.email,
    password: testUser.password
  });
  assert(loginRes.statusCode === 200, `Login returned HTTP 200 (Got: ${loginRes.statusCode})`);
  assert(loginRes.data?.data?.user?.email === testUser.email, 'Logged in user email matches');

  // Test 4: Reject Invalid Credentials
  const badLogin = await request('POST', '/api/auth/login', {
    email: testUser.email,
    password: 'WrongPassword999!'
  });
  assert(badLogin.statusCode === 401, `Invalid credentials rejected with HTTP 401 (Got: ${badLogin.statusCode})`);

  // Test 5: Protected Route GET /api/auth/me with valid Bearer Token
  const meRes = await request('GET', '/api/auth/me', null, {
    'Authorization': `Bearer ${customerToken}`
  });
  assert(meRes.statusCode === 200, `GET /api/auth/me with Bearer token returned HTTP 200 (Got: ${meRes.statusCode})`);
  assert(meRes.data?.data?.user?.role === 'CUSTOMER', 'Authenticated user role is CUSTOMER');

  // Test 6: Reject Access to Protected Route without Token
  const noTokenRes = await request('GET', '/api/auth/me');
  assert(noTokenRes.statusCode === 401, `Request without token rejected with HTTP 401 (Got: ${noTokenRes.statusCode})`);

  // Test 7: Admin Login
  const adminLoginRes = await request('POST', '/api/auth/login', {
    email: 'admin@navaseal.site',
    password: 'Admin123!'
  });
  assert(adminLoginRes.statusCode === 200, 'Default Admin login succeeded');
  adminToken = adminLoginRes.data?.data?.token;

  // Test 8: RBAC Verification on /api/auth/admin-check
  // Customer token should be rejected (403 Forbidden)
  const custForbidden = await request('GET', '/api/auth/admin-check', null, {
    'Authorization': `Bearer ${customerToken}`
  });
  assert(custForbidden.statusCode === 403, `Customer access to admin endpoint denied with HTTP 403 (Got: ${custForbidden.statusCode})`);

  // Admin token should be approved (200 OK)
  const adminAllowed = await request('GET', '/api/auth/admin-check', null, {
    'Authorization': `Bearer ${adminToken}`
  });
  assert(adminAllowed.statusCode === 200, `Admin access to admin endpoint allowed with HTTP 200 (Got: ${adminAllowed.statusCode})`);

  // Test 9: Forgot Password & Reset Token Dispatch
  const forgotRes = await request('POST', '/api/auth/forgot-password', {
    email: testUser.email
  });
  assert(forgotRes.statusCode === 200, 'Forgot password dispatch returned HTTP 200');
  const resetToken = forgotRes.data?.debugToken;

  if (resetToken) {
    const resetRes = await request('POST', '/api/auth/reset-password', {
      token: resetToken,
      newPassword: 'BrandNewPassword456!'
    });
    assert(resetRes.statusCode === 200, 'Password reset succeeded with valid token');
  }

  server.close();

  console.log('--------------------------------------------------');
  console.log(`PHASE 3 SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log('==================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runPhase3Tests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

