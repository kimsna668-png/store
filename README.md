# NAVASEALSTORE CLONE PRO 🚀

> High-performance, functional, responsive digital-products e-commerce platform inspired by [navaseal.site/digital-products/digital-product-2](https://navaseal.site/digital-products/digital-product-2).

---

## 🌟 Key Features Overview

- **Reference-Accurate UI/UX**: Recreates the header, announcement banner, search system, Khmer & English typography, instant delivery badges, product showcase, and footer.
- **Dual Currency Support**: Instant toggle between **USD ($)** and **Khmer Riel (៛)** with real-time conversion.
- **Full Digital Product Delivery**: Supports instant download files, license keys, cloud links, and account credentials with download limits and signed tokens.
- **Multi-Gateway Payment System**: Built for both international cards via **Stripe** and Cambodian local banking (**Bakong KHQR**, **ABA Pay**, **Wing Bank**, manual slip verification).
- **Automated Telegram Bot**: Instant notifications to admins and customers via Telegram Bot API (`@navaseal` integration).
- **Comprehensive Database**: 22 PostgreSQL models managed via Prisma ORM.
- **Role-Based Security**: Customer, Admin, and Super Admin roles with JWT authentication, helmet security, and rate limiting.

---

## 📁 Project Architecture

```
navasealstore-clone-pro/
├── frontend/                  # React + Vite + Tailwind CSS + Lucide
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable UI elements & badges
│   │   ├── pages/             # Storefront, product detail, checkout, admin
│   │   ├── layouts/           # Customer & Admin dashboard layouts
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API client (Axios)
│   │   ├── context/           # Auth, Cart, Currency contexts
│   │   ├── utils/             # Formatters & currency helpers
│   │   ├── styles/            # Tailwind base & Khmer typography
│   │   ├── App.jsx            # Main router
│   │   └── main.jsx           # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/                   # Node.js + Express + Prisma REST API
│   ├── src/
│   │   ├── config/            # DB, env, payment, storage configs
│   │   ├── controllers/       # Auth, products, cart, orders, delivery, admin
│   │   ├── middleware/        # JWT auth, RBAC, rate-limiting, error handler
│   │   ├── routes/            # REST API route handlers
│   │   ├── services/          # Stripe, Bakong, Telegram, delivery services
│   │   ├── validators/        # Request schemas & sanitize
│   │   ├── utils/             # Signed tokens, hash helpers
│   │   └── server.js          # Express app entrypoint
│   ├── prisma/
│   │   └── schema.prisma      # 22 relational models
│   ├── tests/                 # Automated test suite
│   └── package.json
├── telegram-bot/              # Standalone / Webhook Telegram Bot service
├── docs/                      # Architectural docs & diagrams
├── docker-compose.yml         # Full-stack Docker orchestration
├── .env.example               # Template environment configuration
└── README.md
```

---

## 📦 Database Models (22 Models)

1. `users` - User accounts & profiles
2. `roles` - Role-based access control (CUSTOMER, ADMIN, SUPER_ADMIN)
3. `categories` - Product categories with Khmer/English localization
4. `products` - Digital products, pricing, compare pricing, delivery types
5. `product_images` - Gallery images and primary thumbnails
6. `product_files` - Private downloadable digital assets
7. `product_variants` - License tiers (e.g., 1 Month, 1 Year, Lifetime)
8. `carts` - Persistent shopping carts
9. `cart_items` - Cart line items with variants
10. `orders` - Order records with unique tracking numbers (`NVS-...`)
11. `order_items` - Purchased products with snapshot prices and delivered data
12. `payments` - Payment records (Stripe, KHQR Bakong, ABA, Wing)
13. `payment_events` - Audit log of webhook and verification events
14. `download_entitlements` - Secure signed download tokens and quota counters
15. `download_logs` - Download audit trail with IP address and user agents
16. `coupons` - Promotional discount codes (percentage or fixed amount)
17. `coupon_redemptions` - Coupon tracking per user and order
18. `reviews` - Customer reviews and 5-star ratings with verification
19. `notifications` - In-app user notifications
20. `telegram_users` - Telegram IDs linked to system users and admins
21. `audit_logs` - System administrative activity logs
22. `website_settings` - Dynamic storefront branding and configuration

---

## 🚀 Quick Setup & Installation

### Prerequisites
- Node.js >= 18
- npm or pnpm
- PostgreSQL 16 (or Docker)

### Option 1: Docker (Fastest)
```bash
docker-compose up -d
```

### Option 2: Local Manual Setup

#### Backend Setup
```bash
cd backend
npm install
cp ../.env.example .env
npx prisma generate
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit frontend at `http://localhost:5173` and backend API at `http://localhost:5000/api/health`.

---

## 📅 Roadmap & Phase Status

- [x] **PHASE 1: Project Foundation** (Architecture, Prisma schema with 22 models, Backend Express server, Initial UI with Khmer typography, Docker setup)
- [x] **PHASE 2: Reference UI Clone** (Recreated https://navaseal.site/digital-products/digital-product-2, full responsive storefront, product gallery, tabs, dual currency USD/KHR, cart drawer, checkout)
- [x] **PHASE 3: Authentication** (JWT, registration, login, logout, password recovery, RBAC with CUSTOMER, ADMIN, SUPER_ADMIN roles, customer dashboard)
- [x] **PHASE 4: Product Management** (Product CRUD, categories, variants, image & digital file uploads via Multer, search & filter endpoints)
- [x] **PHASE 5: Shopping Cart** (Persistent cart management, subtotal/total calculation, coupon engine NAVA10/SEAL20, availability validation)
- [x] **PHASE 6: Payment Integration** (Stripe checkout session, Bakong KHQR dynamic generator, deep links, server-side verification, duplicate payment prevention, audit logs)
- [x] **PHASE 7: Automatic Delivery** (Signed download tokens, private file streaming, quota limits, license key generators, expiration enforcement)
- [x] **PHASE 8: Customer Dashboard** (Orders, digital license keys, download files, order tracking /orders/:orderNumber)
- [x] **PHASE 9: Admin Dashboard** (Sales analytics, orders approval, products, settings, revenue metrics)
- [x] **PHASE 10: Telegram Integration** (Bot webhook, /start, /products, /order, /support, instant admin alerts)
- [x] **PHASE 11: Testing & Security** (Master automated test harness: 8 suites, 124 tests passed, 0 failed)
- [x] **PHASE 12: Final Packaging** (Full package, migrations, seed script, complete ZIP archive)

