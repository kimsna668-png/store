
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  passwordHash: 'passwordHash',
  fullName: 'fullName',
  phoneNumber: 'phoneNumber',
  avatarUrl: 'avatarUrl',
  roleId: 'roleId',
  isEmailVerified: 'isEmailVerified',
  emailVerifyToken: 'emailVerifyToken',
  resetPasswordToken: 'resetPasswordToken',
  resetPasswordExpires: 'resetPasswordExpires',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  nameKhmer: 'nameKhmer',
  slug: 'slug',
  description: 'description',
  icon: 'icon',
  imageUrl: 'imageUrl',
  displayOrder: 'displayOrder',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  title: 'title',
  titleKhmer: 'titleKhmer',
  slug: 'slug',
  shortDescription: 'shortDescription',
  description: 'description',
  price: 'price',
  comparePrice: 'comparePrice',
  costPrice: 'costPrice',
  categoryId: 'categoryId',
  deliveryType: 'deliveryType',
  instantContent: 'instantContent',
  isAvailable: 'isAvailable',
  isFeatured: 'isFeatured',
  maxDownloads: 'maxDownloads',
  downloadExpiryDays: 'downloadExpiryDays',
  viewCount: 'viewCount',
  salesCount: 'salesCount',
  seoTitle: 'seoTitle',
  seoDescription: 'seoDescription',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductImageScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  url: 'url',
  altText: 'altText',
  isPrimary: 'isPrimary',
  displayOrder: 'displayOrder',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductFileScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  fileName: 'fileName',
  fileSize: 'fileSize',
  mimeType: 'mimeType',
  storagePath: 'storagePath',
  fileVersion: 'fileVersion',
  isPublic: 'isPublic',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductVariantScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  title: 'title',
  price: 'price',
  comparePrice: 'comparePrice',
  sku: 'sku',
  instantData: 'instantData',
  isAvailable: 'isAvailable',
  displayOrder: 'displayOrder',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CartScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  sessionId: 'sessionId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CartItemScalarFieldEnum = {
  id: 'id',
  cartId: 'cartId',
  productId: 'productId',
  variantId: 'variantId',
  quantity: 'quantity',
  unitPrice: 'unitPrice',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  orderNumber: 'orderNumber',
  userId: 'userId',
  customerName: 'customerName',
  customerEmail: 'customerEmail',
  customerPhone: 'customerPhone',
  telegramUsername: 'telegramUsername',
  subtotal: 'subtotal',
  discountTotal: 'discountTotal',
  totalAmount: 'totalAmount',
  currency: 'currency',
  status: 'status',
  paymentStatus: 'paymentStatus',
  couponId: 'couponId',
  customerNotes: 'customerNotes',
  adminNotes: 'adminNotes',
  deliveredAt: 'deliveredAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderItemScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  productId: 'productId',
  variantId: 'variantId',
  productTitle: 'productTitle',
  variantTitle: 'variantTitle',
  quantity: 'quantity',
  unitPrice: 'unitPrice',
  totalPrice: 'totalPrice',
  deliveryContent: 'deliveryContent',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  paymentMethod: 'paymentMethod',
  amount: 'amount',
  currency: 'currency',
  status: 'status',
  transactionRef: 'transactionRef',
  paymentProofUrl: 'paymentProofUrl',
  gatewayResponse: 'gatewayResponse',
  verifiedBy: 'verifiedBy',
  verifiedAt: 'verifiedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PaymentEventScalarFieldEnum = {
  id: 'id',
  paymentId: 'paymentId',
  eventType: 'eventType',
  eventData: 'eventData',
  createdAt: 'createdAt'
};

exports.Prisma.DownloadEntitlementScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  userId: 'userId',
  productId: 'productId',
  productFileId: 'productFileId',
  downloadToken: 'downloadToken',
  maxDownloads: 'maxDownloads',
  downloadCount: 'downloadCount',
  expiresAt: 'expiresAt',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DownloadLogScalarFieldEnum = {
  id: 'id',
  entitlementId: 'entitlementId',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  downloadedAt: 'downloadedAt'
};

exports.Prisma.CouponScalarFieldEnum = {
  id: 'id',
  code: 'code',
  description: 'description',
  discountType: 'discountType',
  discountValue: 'discountValue',
  minOrderAmount: 'minOrderAmount',
  maxDiscount: 'maxDiscount',
  usageLimit: 'usageLimit',
  usageCount: 'usageCount',
  startDate: 'startDate',
  endDate: 'endDate',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CouponRedemptionScalarFieldEnum = {
  id: 'id',
  couponId: 'couponId',
  orderId: 'orderId',
  userId: 'userId',
  redeemedAt: 'redeemedAt'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  userId: 'userId',
  authorName: 'authorName',
  rating: 'rating',
  comment: 'comment',
  isVerified: 'isVerified',
  isApproved: 'isApproved',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  message: 'message',
  type: 'type',
  isRead: 'isRead',
  linkUrl: 'linkUrl',
  createdAt: 'createdAt'
};

exports.Prisma.TelegramUserScalarFieldEnum = {
  id: 'id',
  telegramId: 'telegramId',
  username: 'username',
  firstName: 'firstName',
  lastName: 'lastName',
  userId: 'userId',
  isAdmin: 'isAdmin',
  isSubscribed: 'isSubscribed',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  action: 'action',
  entity: 'entity',
  entityId: 'entityId',
  ipAddress: 'ipAddress',
  details: 'details',
  createdAt: 'createdAt'
};

exports.Prisma.WebsiteSettingScalarFieldEnum = {
  id: 'id',
  key: 'key',
  value: 'value',
  description: 'description',
  isPublic: 'isPublic',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.RoleType = exports.$Enums.RoleType = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
};

exports.DeliveryType = exports.$Enums.DeliveryType = {
  INSTANT_FILE: 'INSTANT_FILE',
  LICENSE_KEY: 'LICENSE_KEY',
  ACCOUNT_CREDENTIALS: 'ACCOUNT_CREDENTIALS',
  EXTERNAL_LINK: 'EXTERNAL_LINK'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  PENDING: 'PENDING',
  AWAITING_PAYMENT: 'AWAITING_PAYMENT',
  PAID: 'PAID',
  PROCESSING: 'PROCESSING',
  DELIVERED: 'DELIVERED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  VERIFYING: 'VERIFYING',
  CANCELLED: 'CANCELLED'
};

exports.PaymentMethod = exports.$Enums.PaymentMethod = {
  STRIPE: 'STRIPE',
  KHQR_BAKONG: 'KHQR_BAKONG',
  ABA_PAY: 'ABA_PAY',
  WING_PAY: 'WING_PAY',
  MANUAL_BANK_TRANSFER: 'MANUAL_BANK_TRANSFER'
};

exports.Prisma.ModelName = {
  Role: 'Role',
  User: 'User',
  Category: 'Category',
  Product: 'Product',
  ProductImage: 'ProductImage',
  ProductFile: 'ProductFile',
  ProductVariant: 'ProductVariant',
  Cart: 'Cart',
  CartItem: 'CartItem',
  Order: 'Order',
  OrderItem: 'OrderItem',
  Payment: 'Payment',
  PaymentEvent: 'PaymentEvent',
  DownloadEntitlement: 'DownloadEntitlement',
  DownloadLog: 'DownloadLog',
  Coupon: 'Coupon',
  CouponRedemption: 'CouponRedemption',
  Review: 'Review',
  Notification: 'Notification',
  TelegramUser: 'TelegramUser',
  AuditLog: 'AuditLog',
  WebsiteSetting: 'WebsiteSetting'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
