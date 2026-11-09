const bcrypt = require('bcryptjs');
const { prisma } = require('../src/config/db');

async function seed() {
  console.log('🌱 Seeding NavasealStore Clone Pro Database...');

  if (!prisma) {
    console.log('⚠️ Prisma Client not connected, skipping direct DB seed.');
    return;
  }

  try {
    // 1. Roles
    const customerRole = await prisma.role.upsert({
      where: { name: 'CUSTOMER' },
      update: {},
      create: { name: 'CUSTOMER', description: 'Standard Customer Role' }
    });

    const adminRole = await prisma.role.upsert({
      where: { name: 'ADMIN' },
      update: {},
      create: { name: 'ADMIN', description: 'Store Administrator' }
    });

    const superAdminRole = await prisma.role.upsert({
      where: { name: 'SUPER_ADMIN' },
      update: {},
      create: { name: 'SUPER_ADMIN', description: 'Super Administrator' }
    });

    console.log('✅ Roles seeded (CUSTOMER, ADMIN, SUPER_ADMIN)');

    // 2. Default Users
    const adminHash = await bcrypt.hash('Admin123!', 10);
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@navaseal.site' },
      update: {},
      create: {
        email: 'admin@navaseal.site',
        passwordHash: adminHash,
        fullName: 'Nava Seal Administrator',
        phoneNumber: '+855968882345',
        roleId: superAdminRole.id,
        isEmailVerified: true
      }
    });

    const customerHash = await bcrypt.hash('Customer123!', 10);
    const customerUser = await prisma.user.upsert({
      where: { email: 'customer@navaseal.site' },
      update: {},
      create: {
        email: 'customer@navaseal.site',
        passwordHash: customerHash,
        fullName: 'Sokha Visal (Customer)',
        phoneNumber: '+85512345678',
        roleId: customerRole.id,
        isEmailVerified: true
      }
    });

    console.log('✅ Default users seeded (admin@navaseal.site, customer@navaseal.site)');

    // 3. Categories
    const aiCategory = await prisma.category.upsert({
      where: { slug: 'ai-tools' },
      update: {},
      create: {
        name: 'AI Automated Tools',
        nameKhmer: 'ឧបករណ៍ស្វ័យប្រវត្តិ AI',
        slug: 'ai-tools',
        icon: 'Bot',
        description: 'AI Video generators, text-to-speech tools, and automations.',
        displayOrder: 1,
        isActive: true
      }
    });

    const softwareCategory = await prisma.category.upsert({
      where: { slug: 'software-licenses' },
      update: {},
      create: {
        name: 'Software Licenses & Keys',
        nameKhmer: 'អាជ្ញាប័ណ្ណកម្មវិធីកុំព្យូទ័រ',
        slug: 'software-licenses',
        icon: 'Key',
        description: 'Genuine OEM lifetime keys for Windows and Office.',
        displayOrder: 2,
        isActive: true
      }
    });

    console.log('✅ Categories seeded');

    // 4. Products
    const dp2 = await prisma.product.upsert({
      where: { slug: 'digital-product-2' },
      update: {},
      create: {
        title: 'Digital Product 2 - AI Automated Video & Content Generator Pro',
        titleKhmer: 'កម្មវិធីបង្កើតវីដេអូ និងមាតិកា AI ស្វ័យប្រវត្តិជំនាន់ទី ២',
        slug: 'digital-product-2',
        categoryId: aiCategory.id,
        price: 15.00,
        comparePrice: 25.00,
        costPrice: 5.00,
        deliveryType: 'INSTANT_FILE',
        instantContent: 'NS-KEY-V2-PRO-ACT-99120',
        shortDescription: 'The ultimate AI video generator and automation tool built specifically for content creators.',
        description: 'Digital Product 2 is the latest cutting-edge software package created by Nava Seal Digital.',
        isAvailable: true,
        isFeatured: true,
        maxDownloads: 10,
        downloadExpiryDays: 365,
        salesCount: 342,
        seoTitle: 'Digital Product 2 AI Video Suite - Nava Seal Store',
        seoDescription: 'Buy Digital Product 2 AI Automated Video Generator.'
      }
    });

    console.log('✅ Products seeded (digital-product-2)');
    console.log('🎉 Database seeding completed successfully.');
  } catch (error) {
    console.error('Seeding error:', error.message);
  }
}

seed().finally(async () => {
  if (prisma) await prisma.$disconnect();
});

