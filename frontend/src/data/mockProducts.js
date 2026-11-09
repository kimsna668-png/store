export const mockCategories = [
  {
    id: 'cat-1',
    name: 'AI Automated Tools',
    nameKhmer: 'ឧបករណ៍ស្វ័យប្រវត្តិ AI',
    slug: 'ai-tools',
    icon: 'Bot',
    count: 6,
    description: 'AI Video generators, text-to-speech tools, story creation automations, and subtitle scripts.'
  },
  {
    id: 'cat-2',
    name: 'Software Licenses & Keys',
    nameKhmer: 'អាជ្ញាប័ណ្ណកម្មវិធីកុំព្យូទ័រ',
    slug: 'software-licenses',
    icon: 'Key',
    count: 8,
    description: 'Genuine OEM and Retail lifetime activation keys for Windows 11, Windows 10, and Microsoft Office.'
  },
  {
    id: 'cat-3',
    name: 'Design & Graphics Assets',
    nameKhmer: 'គំរូរចនាក្រាហ្វិក និង Canva Pro',
    slug: 'design-graphics',
    icon: 'Palette',
    count: 5,
    description: 'Canva Pro lifetime upgrades, Adobe template kits, AI logo bundles, and social media banners.'
  },
  {
    id: 'cat-4',
    name: 'Monetized Accounts & Services',
    nameKhmer: 'គណនីរកលុយ និងសេវាកម្ម',
    slug: 'accounts-services',
    icon: 'UserCheck',
    count: 4,
    description: 'Verified TikTok Creator Reward accounts (US / France / Japan / UK) and YouTube monetization packages.'
  },
  {
    id: 'cat-5',
    name: 'Developer Source Code & POS',
    nameKhmer: 'កូដប្រព័ន្ធគ្រប់គ្រង និង POS',
    slug: 'source-code',
    icon: 'Code',
    count: 7,
    description: 'Khmer-supported Point-of-Sale systems, school management scripts, inventory, and hotel systems.'
  }
];

export const mockProducts = [
  {
    id: '1',
    slug: 'digital-product-2',
    title: 'Digital Product 2 - AI Automated Video & Content Generator Pro',
    titleKhmer: 'កម្មវិធីបង្កើតវីដេអូ និងមាតិកា AI ស្វ័យប្រវត្តិជំនាន់ទី ២',
    category: {
      id: 'cat-1',
      name: 'AI Automated Tools',
      slug: 'ai-tools'
    },
    price: 15.00,
    comparePrice: 25.00,
    rating: 4.9,
    reviewsCount: 128,
    salesCount: 342,
    badge: 'Flagship Tool',
    deliveryType: 'INSTANT_FILE',
    instantContent: 'DOWNLOAD_ZIP_KEY_ACTIVATION_INSTANT',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v1', title: 'Single Personal License (1 Device)', price: 15.00, comparePrice: 25.00 },
      { id: 'v2', title: 'Agency License (5 Devices + 1 Year Updates)', price: 29.00, comparePrice: 49.00 },
      { id: 'v3', title: 'Lifetime Unlimited Developer Access', price: 49.00, comparePrice: 89.00 }
    ],
    shortDescription: 'The ultimate AI video generator and automation tool built specifically for content creators, TikTokers, YouTubers, and digital marketers. Generates voiceovers, captions, and localized media automatically.',
    shortDescriptionKhmer: 'កម្មវិធីបង្កើតវីដេអូ AI ជំនាន់ទី ២ សម្រាប់អ្នកបង្កើតមាតិកា Facebook, TikTok, YouTube ជាមួយសមត្ថភាពបកប្រែ បញ្ចូលសម្លេង និងដាក់ Subtitle ស្វ័យប្រវត្តិតាមភាសាខ្មែរ និងអន្តរជាតិ។',
    description: `### Product Overview

**Digital Product 2 (Nava Seal AI Video & Automation Suite)** is the latest cutting-edge software package created by Nava Seal Digital. Tailored for both beginners and professional content creators, it automates the laborious process of researching topics, generating natural AI voiceovers, synthesizing high-quality video B-roll clips, generating synchronized subtitles, and exporting 4K/60FPS reels and shorts with a single click.

---

### 🔥 Key Features & Capabilities

- **Automatic AI Script Generator:** Integrated with state-of-the-art LLM prompts for viral storytelling, educational tutorials, tech reviews, and news summaries.
- **Natural Voice Synthesis:** Supports ultra-realistic human voices in multiple languages including Khmer, English, Thai, and Vietnamese.
- **Smart B-Roll & Visual Stitching:** Automatically selects relevant copyright-free footage, overlays animations, and blends scene transitions seamlessly.
- **Auto Dynamic Subtitles:** Generates animated TikTok/Reels style subtitles with customizable colors, fonts (including beautiful Khmer Unicode fonts), and highlights.
- **Batch Production Mode:** Create 10 to 50 videos in a single automated queue run.
- **Zero API Key Overhead:** Includes ready-to-run built-in automation drivers without complex cloud setup.

---

### 📦 What You Will Receive After Purchase

1. **Instant Download Link** to the complete software installer (.ZIP)
2. **Permanent Activation License Key** generated immediately on the checkout page & order dashboard
3. **Step-by-Step Video Tutorial (Khmer & English)** showing installation and daily workflow
4. **VIP Telegram Support Group Access** (@navaseal) for 24/7 technical questions, feature updates, and troubleshooting`,
    features: [
      'Instant delivery via Bakong KHQR & Stripe',
      'One-click automated video creation workflow',
      'Pre-configured templates for TikTok, Shorts, and Reels',
      'Khmer Unicode and Inter typography rendering engine',
      'Free software patches & lifetime Telegram support',
      'Tested on Windows 10/11 & macOS'
    ]
  },
  {
    id: '2',
    slug: 'windows-11-pro-license-oem',
    title: 'Windows 11 Professional Genuine Lifetime OEM Retail License Key',
    titleKhmer: 'គន្លឹះអាជ្ញាប័ណ្ណ Windows 11 Pro ស្របច្បាប់ពេញមួយជីវិត',
    category: {
      id: 'cat-2',
      name: 'Software Licenses & Keys',
      slug: 'software-licenses'
    },
    price: 9.99,
    comparePrice: 35.00,
    rating: 5.0,
    reviewsCount: 384,
    salesCount: 1240,
    badge: '100% Genuine',
    deliveryType: 'LICENSE_KEY',
    instantContent: 'W269N-WFGWX-YVC9B-4J6C9-T83GX',
    imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&auto=format&fit=crop&q=80',
    variants: [
      { id: 'w1', title: '1 PC Lifetime OEM Activation', price: 9.99, comparePrice: 35.00 },
      { id: 'w2', title: '3 PC Bundle Family Pack', price: 24.00, comparePrice: 90.00 },
      { id: 'w3', title: 'Windows 11 Pro + Office 2021 Pro Combo', price: 29.99, comparePrice: 110.00 }
    ],
    shortDescription: 'Official Microsoft Windows 11 Professional 64-bit lifetime digital key. Direct activation via Microsoft servers with permanent updates.',
    description: 'Official 25-digit genuine Windows 11 Professional OEM key. Delivered instantly upon payment verification.'
  },
  {
    id: '3',
    slug: 'canva-pro-lifetime-subscription',
    title: 'Canva Pro Lifetime Upgrade & Brand Kit Enterprise Access',
    titleKhmer: 'គណនី Canva Pro ប្រើប្រាស់ពេញមួយជីវិត ជាមួយ Brand Kit',
    category: {
      id: 'cat-3',
      name: 'Design & Graphics Assets',
      slug: 'design-graphics'
    },
    price: 8.50,
    comparePrice: 19.99,
    rating: 4.8,
    reviewsCount: 290,
    salesCount: 890,
    badge: 'Best Value',
    deliveryType: 'ACCOUNT_CREDENTIALS',
    instantContent: 'UPGRADE_INVITE_CANVA_ENTERPRISE',
    imageUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1200&auto=format&fit=crop&q=80',
    variants: [
      { id: 'c1', title: 'Canva Pro Lifetime (Upgrade Your Existing Email)', price: 8.50, comparePrice: 19.99 },
      { id: 'c2', title: 'Canva Pro 10-Member Team Plan', price: 25.00, comparePrice: 60.00 }
    ],
    shortDescription: 'Upgrade your personal Canva account to Pro status forever. Unlimited premium stock photos, background remover, brand kits, and AI tools.',
    description: 'Transform your design capability with genuine Canva Pro. Works seamlessly on Web, Windows, Mac, iPad, Android, and iOS.'
  },
  {
    id: '4',
    slug: 'monetized-tiktok-us-creator-account',
    title: 'Monetized TikTok USA Creator Rewards Account (10k+ Real Followers)',
    titleKhmer: 'គណនី TikTok USA រកលុយបានស្រាប់ (Followers 10,000+ ពិតៗ)',
    category: {
      id: 'cat-4',
      name: 'Monetized Accounts & Services',
      slug: 'accounts-services'
    },
    price: 39.00,
    comparePrice: 75.00,
    rating: 4.9,
    reviewsCount: 95,
    salesCount: 215,
    badge: 'Creator Ready',
    deliveryType: 'ACCOUNT_CREDENTIALS',
    instantContent: 'TIKTOK_USA_LOGIN_CREDENTIALS_AND_ORIGINAL_EMAIL',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop&q=80',
    variants: [
      { id: 't1', title: '10K Followers (Creator Rewards Beta Ready)', price: 39.00, comparePrice: 75.00 },
      { id: 't2', title: '50K Followers (High Engagement US Audience)', price: 89.00, comparePrice: 150.00 }
    ],
    shortDescription: 'Organic US-registered TikTok account with Creator Rewards Program already unlocked. 100% clean history, no strikes, full original email transfer.',
    description: 'Instant transfer of login credentials and original recovery email. Includes complete US IP setup guide for Cambodian and international creators.'
  },
  {
    id: '5',
    slug: 'cambodia-khmer-pos-inventory-system',
    title: 'Khmer POS & Inventory Management System (Full Source Code & Database)',
    titleKhmer: 'ប្រព័ន្ធគ្រប់គ្រងការលក់ និងស្តុកទំនិញ POS ភាសាខ្មែរ (កូដពេញ)',
    category: {
      id: 'cat-5',
      name: 'Developer Source Code & POS',
      slug: 'source-code'
    },
    price: 49.00,
    comparePrice: 120.00,
    rating: 5.0,
    reviewsCount: 46,
    salesCount: 168,
    badge: 'Full Source Code',
    deliveryType: 'INSTANT_FILE',
    instantContent: 'GITHUB_REPO_AND_ZIP_DATABASE_PACKAGE',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1200&auto=format&fit=crop&q=80',
    variants: [
      { id: 'p1', title: 'Developer Single Project License', price: 49.00, comparePrice: 120.00 },
      { id: 'p2', title: 'Unlimited Commercial Resale License', price: 99.00, comparePrice: 250.00 }
    ],
    shortDescription: 'Full-featured React, Node.js, and PostgreSQL POS system with Khmer receipt printing, Bakong KHQR dynamic QR generation, barcode scanner, and profit analytics.',
    description: 'Clean production-ready source code with complete database migrations, thermal receipt printer support (80mm/58mm), Bakong KHQR payment integration, and offline cache.'
  },
  {
    id: '6',
    slug: 'ai-story-video-generator-khmer-audio',
    title: 'AI Story Video Creator & Khmer Voiceover Automation Tool',
    titleKhmer: 'កម្មវិធីបង្កើតវីដេអូរឿង AI និងបញ្ចូលសម្លេងខ្មែរស្វ័យប្រវត្តិកម្រិតខ្ពស់',
    category: {
      id: 'cat-1',
      name: 'AI Automated Tools',
      slug: 'ai-tools'
    },
    price: 19.99,
    comparePrice: 39.00,
    rating: 4.8,
    reviewsCount: 78,
    salesCount: 230,
    badge: 'Popular',
    deliveryType: 'INSTANT_FILE',
    instantContent: 'KHMER_AI_STORY_INSTALLER_V2',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    variants: [
      { id: 's1', title: 'Lifetime License', price: 19.99, comparePrice: 39.00 }
    ],
    shortDescription: 'Automate fairy tales, ghost stories, history facts, and moral stories for YouTube with emotional voiceovers and auto image-to-video prompts.',
    description: 'Everything you need to run a high-earning storytelling channel without recording your voice or editing videos by hand.'
  }
];

