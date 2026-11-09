const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config(); // fallback to local .env

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/navasealstore_db?schema=public',
  JWT_SECRET: process.env.JWT_SECRET || 'navaseal-super-secret-jwt-key-32chars-min-prod',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_key',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder',
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
  TELEGRAM_WEBHOOK_SECRET: process.env.TELEGRAM_WEBHOOK_SECRET || 'secret-webhook-key',
  TELEGRAM_ADMIN_CHAT_ID: process.env.TELEGRAM_ADMIN_CHAT_ID || '',
  SUPABASE_URL: process.env.SUPABASE_URL || 'https://glnlqubeblzrszntgbkb.supabase.co',
  SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_DgGAYvmN4ji3OLheN3guvg_I9-79EB8',
  SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY || '',
  SUPABASE_JWKS_URL: process.env.SUPABASE_JWKS_URL || '',
  UPLOAD_DIR: path.resolve(__dirname, '../../uploads'),
  STORAGE_DIR: path.resolve(__dirname, '../../storage/digital_files')
};

