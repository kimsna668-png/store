const crypto = require('crypto');

// Initial seed categories
const initialCategories = [
  {
    id: 'cat-1',
    name: 'AI Automated Tools',
    nameKhmer: 'ឧបករណ៍ស្វ័យប្រវត្តិ AI',
    slug: 'ai-tools',
    icon: 'Bot',
    description: 'AI Video generators, text-to-speech tools, story creation automations, and subtitle scripts.',
    displayOrder: 1,
    isActive: true
  },
  {
    id: 'cat-2',
    name: 'Software Licenses & Keys',
    nameKhmer: 'អាជ្ញាប័ណ្ណកម្មវិធីកុំព្យូទ័រ',
    slug: 'software-licenses',
    icon: 'Key',
    description: 'Genuine OEM and Retail lifetime activation keys for Windows 11, Windows 10, and Microsoft Office.',
    displayOrder: 2,
    isActive: true
  },
  {
    id: 'cat-3',
    name: 'Design & Graphics Assets',
    nameKhmer: 'គំរូរចនាក្រាហ្វិក និង Canva Pro',
    slug: 'design-graphics',
    icon: 'Palette',
    description: 'Canva Pro lifetime upgrades, Adobe template kits, AI logo bundles, and social media banners.',
    displayOrder: 3,
    isActive: true
  },
  {
    id: 'cat-4',
    name: 'Monetized Accounts & Services',
    nameKhmer: 'គណនីរកលុយ និងសេវាកម្ម',
    slug: 'accounts-services',
    icon: 'UserCheck',
    description: 'Verified TikTok Creator Reward accounts (US / France / Japan / UK) and YouTube monetization packages.',
    displayOrder: 4,
    isActive: true
  },
  {
    id: 'cat-5',
    name: 'Developer Source Code & POS',
    nameKhmer: 'កូដប្រព័ន្ធគ្រប់គ្រង និង POS',
    slug: 'source-code',
    icon: 'Code',
    description: 'Khmer-supported Point-of-Sale systems, school management scripts, inventory, and hotel systems.',
    displayOrder: 5,
    isActive: true
  }
];

// Initial seed products
const initialProducts = [
  {
    id: 'prod-1',
    title: 'Digital Product 2 - AI Automated Video & Content Generator Pro',
    titleKhmer: 'កម្មវិធីបង្កើតវីដេអូ និងមាតិកា AI ស្វ័យប្រវត្តិជំនាន់ទី ២',
    slug: 'digital-product-2',
    categoryId: 'cat-1',
    price: 15.00,
    comparePrice: 25.00,
    costPrice: 5.00,
    deliveryType: 'INSTANT_FILE',
    instantContent: 'NS-KEY-V2-PRO-ACT-99120',
    shortDescription: 'The ultimate AI video generator and automation tool built specifically for content creators, TikTokers, YouTubers, and digital marketers.',
    description: 'Digital Product 2 is the latest cutting-edge software package created by Nava Seal Digital. Tailored for both beginners and professional content creators, it automates the laborious process of researching topics, generating natural AI voiceovers, synthesizing high-quality video B-roll clips, generating synchronized subtitles, and exporting 4K/60FPS reels and shorts with a single click.',
    isAvailable: true,
    isFeatured: true,
    maxDownloads: 10,
    downloadExpiryDays: 365,
    salesCount: 342,
    rating: 4.9,
    reviewsCount: 128,
    seoTitle: 'Digital Product 2 AI Video Suite - Nava Seal Store',
    seoDescription: 'Buy Digital Product 2 AI Automated Video Generator with instant Bakong KHQR delivery.',
    images: [
      { id: 'img-1', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80', isPrimary: true },
      { id: 'img-2', url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80', isPrimary: false }
    ],
    variants: [
      { id: 'var-1', title: 'Single Personal License (1 Device)', price: 15.00, comparePrice: 25.00, sku: 'DP2-SINGLE' },
      { id: 'var-2', title: 'Agency License (5 Devices + 1 Year Updates)', price: 29.00, comparePrice: 49.00, sku: 'DP2-AGENCY' },
      { id: 'var-3', title: 'Lifetime Unlimited Developer Access', price: 49.00, comparePrice: 89.00, sku: 'DP2-LIFETIME' }
    ],
    files: [
      { id: 'file-1', fileName: 'NavaSeal_AI_Video_Suite_v2.5_Pro.zip', fileSize: 184500000, mimeType: 'application/zip', storagePath: 'digital_files/DP2_v2.5.zip' }
    ]
  },
  {
    id: 'prod-2',
    title: 'Windows 11 Professional Genuine Lifetime OEM Retail License Key',
    titleKhmer: 'គន្លឹះអាជ្ញាប័ណ្ណ Windows 11 Pro ស្របច្បាប់ពេញមួយជីវិត',
    slug: 'windows-11-pro-license-oem',
    categoryId: 'cat-2',
    price: 9.99,
    comparePrice: 35.00,
    costPrice: 3.50,
    deliveryType: 'LICENSE_KEY',
    instantContent: 'W269N-WFGWX-YVC9B-4J6C9-T83GX',
    shortDescription: 'Official Microsoft Windows 11 Professional 64-bit lifetime digital key with permanent updates.',
    description: 'Official 25-digit genuine Windows 11 Professional OEM key. Delivered instantly upon payment verification.',
    isAvailable: true,
    isFeatured: true,
    maxDownloads: 5,
    downloadExpiryDays: 30,
    salesCount: 1240,
    rating: 5.0,
    reviewsCount: 384,
    images: [
      { id: 'img-3', url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&auto=format&fit=crop&q=80', isPrimary: true }
    ],
    variants: [
      { id: 'var-4', title: '1 PC Lifetime OEM Activation', price: 9.99, comparePrice: 35.00, sku: 'WIN11-OEM-1' },
      { id: 'var-5', title: '3 PC Bundle Family Pack', price: 24.00, comparePrice: 90.00, sku: 'WIN11-OEM-3' }
    ],
    files: []
  },
  {
    id: 'prod-3',
    title: 'Canva Pro Lifetime Upgrade & Brand Kit Enterprise Access',
    titleKhmer: 'គណនី Canva Pro ប្រើប្រាស់ពេញមួយជីវិត ជាមួយ Brand Kit',
    slug: 'canva-pro-lifetime-subscription',
    categoryId: 'cat-3',
    price: 8.50,
    comparePrice: 19.99,
    costPrice: 2.00,
    deliveryType: 'ACCOUNT_CREDENTIALS',
    instantContent: 'CANVA_ENTERPRISE_INVITE_TOKEN_LIFETIME',
    shortDescription: 'Upgrade your personal Canva account to Pro status forever with unlimited premium assets.',
    description: 'Transform your design capability with genuine Canva Pro. Works seamlessly on Web, Windows, Mac, iPad, Android, and iOS.',
    isAvailable: true,
    isFeatured: true,
    maxDownloads: 5,
    downloadExpiryDays: 30,
    salesCount: 890,
    rating: 4.8,
    reviewsCount: 290,
    images: [
      { id: 'img-4', url: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1200&auto=format&fit=crop&q=80', isPrimary: true }
    ],
    variants: [
      { id: 'var-6', title: 'Canva Pro Lifetime (Upgrade Your Existing Email)', price: 8.50, comparePrice: 19.99, sku: 'CANVA-PRO-1' }
    ],
    files: []
  }
];

class ProductStore {
  constructor() {
    this.categories = new Map(initialCategories.map(c => [c.id, { ...c }]));
    this.products = new Map(initialProducts.map(p => [p.id, { ...p }]));
  }

  // CATEGORIES
  listCategories() {
    return Array.from(this.categories.values()).map(cat => {
      const productCount = Array.from(this.products.values()).filter(p => p.categoryId === cat.id).length;
      return { ...cat, productCount };
    });
  }

  getCategoryById(id) {
    return this.categories.get(id) || null;
  }

  getCategoryBySlug(slug) {
    return Array.from(this.categories.values()).find(c => c.slug === slug) || null;
  }

  createCategory(data) {
    const id = `cat-${crypto.randomUUID().slice(0, 8)}`;
    const newCat = {
      id,
      name: data.name,
      nameKhmer: data.nameKhmer || null,
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      icon: data.icon || 'Zap',
      description: data.description || '',
      displayOrder: data.displayOrder || this.categories.size + 1,
      isActive: data.isActive !== undefined ? data.isActive : true
    };
    this.categories.set(id, newCat);
    return newCat;
  }

  updateCategory(id, data) {
    const cat = this.categories.get(id);
    if (!cat) return null;
    const updated = { ...cat, ...data, updatedAt: new Date().toISOString() };
    this.categories.set(id, updated);
    return updated;
  }

  deleteCategory(id) {
    return this.categories.delete(id);
  }

  // PRODUCTS
  listProducts(filters = {}) {
    let list = Array.from(this.products.values());

    if (filters.category) {
      const cat = this.getCategoryBySlug(filters.category) || this.getCategoryById(filters.category);
      if (cat) {
        list = list.filter(p => p.categoryId === cat.id);
      }
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) ||
        (p.titleKhmer && p.titleKhmer.toLowerCase().includes(q)) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q))
      );
    }

    if (filters.isFeatured !== undefined) {
      list = list.filter(p => p.isFeatured === Boolean(filters.isFeatured));
    }

    if (filters.minPrice) {
      list = list.filter(p => p.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      list = list.filter(p => p.price <= Number(filters.maxPrice));
    }

    // Sorting
    if (filters.sort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filters.sort === 'sales') {
      list.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
    }

    // Attach category object for each product
    return list.map(p => ({
      ...p,
      category: this.getCategoryById(p.categoryId)
    }));
  }

  getProductById(id) {
    const product = this.products.get(id);
    if (!product) return null;
    return {
      ...product,
      category: this.getCategoryById(product.categoryId)
    };
  }

  getProductBySlug(slug) {
    const product = Array.from(this.products.values()).find(p => p.slug === slug);
    if (!product) return null;
    return {
      ...product,
      category: this.getCategoryById(product.categoryId)
    };
  }

  createProduct(data) {
    const id = `prod-${crypto.randomUUID().slice(0, 8)}`;
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProduct = {
      id,
      title: data.title,
      titleKhmer: data.titleKhmer || null,
      slug,
      categoryId: data.categoryId,
      price: Number(data.price),
      comparePrice: data.comparePrice ? Number(data.comparePrice) : null,
      costPrice: data.costPrice ? Number(data.costPrice) : null,
      deliveryType: data.deliveryType || 'INSTANT_FILE',
      instantContent: data.instantContent || null,
      shortDescription: data.shortDescription || '',
      description: data.description || '',
      isAvailable: data.isAvailable !== undefined ? data.isAvailable : true,
      isFeatured: data.isFeatured !== undefined ? data.isFeatured : false,
      maxDownloads: data.maxDownloads || 5,
      downloadExpiryDays: data.downloadExpiryDays || 30,
      salesCount: 0,
      rating: 5.0,
      reviewsCount: 0,
      seoTitle: data.seoTitle || data.title,
      seoDescription: data.seoDescription || data.shortDescription,
      images: data.images || [],
      variants: data.variants || [],
      files: data.files || [],
      createdAt: new Date().toISOString()
    };
    this.products.set(id, newProduct);
    return this.getProductById(id);
  }

  updateProduct(id, data) {
    const existing = this.products.get(id);
    if (!existing) return null;

    const updated = {
      ...existing,
      ...data,
      price: data.price !== undefined ? Number(data.price) : existing.price,
      comparePrice: data.comparePrice !== undefined ? Number(data.comparePrice) : existing.comparePrice,
      updatedAt: new Date().toISOString()
    };
    this.products.set(id, updated);
    return this.getProductById(id);
  }

  deleteProduct(id) {
    return this.products.delete(id);
  }
}

module.exports = new ProductStore();

