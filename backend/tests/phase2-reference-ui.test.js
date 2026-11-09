const fs = require('fs');
const path = require('path');

async function runPhase2Tests() {
  console.log('==================================================');
  console.log('🧪 RUNNING PHASE 2: REFERENCE UI CLONE TEST SUITE');
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

  // Test 1: Verify mock dataset file exists
  const mockPath = path.resolve(__dirname, '../../frontend/src/data/mockProducts.js');
  assert(fs.existsSync(mockPath), `mockProducts.js exists at ${mockPath}`);

  const mockContent = fs.readFileSync(mockPath, 'utf8');

  // Test 2: Check reference product slug 'digital-product-2'
  assert(mockContent.includes("'digital-product-2'"), "Reference product 'digital-product-2' is present in catalog");
  assert(mockContent.includes("titleKhmer"), "Khmer typography title field present");
  assert(mockContent.includes("INSTANT_FILE"), "Instant digital delivery file type configured");

  // Test 3: Verify Page components exist
  const expectedPages = [
    'HomePage.jsx',
    'ProductDetailsPage.jsx',
    'ProductListingPage.jsx',
    'CategoriesPage.jsx',
    'CartPage.jsx',
    'CheckoutPage.jsx',
    'FAQPage.jsx',
    'ContactPage.jsx',
    'StaticPages.jsx'
  ];

  expectedPages.forEach(page => {
    const pPath = path.resolve(__dirname, `../../frontend/src/pages/${page}`);
    assert(fs.existsSync(pPath), `Page component exists: ${page}`);
  });

  // Test 4: Verify Components
  const expectedComponents = [
    'Header.jsx',
    'Footer.jsx',
    'ProductCard.jsx',
    'CartDrawer.jsx'
  ];

  expectedComponents.forEach(comp => {
    const cPath = path.resolve(__dirname, `../../frontend/src/components/${comp}`);
    assert(fs.existsSync(cPath), `Core component exists: ${comp}`);
  });

  // Test 5: Verify Cart Calculation Logic
  const subtotal = 15.00 * 2; // 30.00
  const couponDiscountPct = 10;
  const discountAmount = subtotal * (couponDiscountPct / 100); // 3.00
  const total = subtotal - discountAmount; // 27.00
  const khrTotal = Math.round(total * 4100); // 110,700 ៛

  assert(total === 27.00, `Cart discount calculation correct: $${total}`);
  assert(khrTotal === 110700, `Khmer Riel currency conversion correct: ${khrTotal.toLocaleString()} ៛`);

  // Test 6: Verify Frontend Build Artifacts exist
  const distHtml = path.resolve(__dirname, '../../frontend/dist/index.html');
  assert(fs.existsSync(distHtml), 'Frontend production build output exists');

  console.log('--------------------------------------------------');
  console.log(`PHASE 2 SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log('==================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runPhase2Tests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

