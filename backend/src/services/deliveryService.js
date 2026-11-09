const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const config = require('../config/env');

class DeliveryService {
  constructor() {
    this.entitlements = new Map(); // token -> entitlement
    this.downloadLogs = [];
  }

  // Fulfill delivery immediately after verified payment
  fulfillDelivery(order, productStore) {
    const entitlementsCreated = [];

    for (const item of order.items) {
      const product = productStore.getProductById(item.productId);
      const token = `DL-${crypto.randomBytes(16).toString('hex').toUpperCase()}`;
      const expiresAt = new Date(Date.now() + (product?.downloadExpiryDays || 30) * 86400000);

      let deliveryData = null;
      let privateFilePath = null;

      if (product?.deliveryType === 'LICENSE_KEY' || item.deliveryType === 'LICENSE_KEY') {
        deliveryData = `NS-OEM-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
      } else if (product?.deliveryType === 'ACCOUNT_CREDENTIALS') {
        deliveryData = `Account: ${order.customerEmail} | License: CANVA-PRO-LIFETIME-${crypto.randomBytes(6).toString('hex').toUpperCase()}`;
      } else {
        // INSTANT_FILE
        deliveryData = `KEY-${crypto.randomBytes(6).toString('hex').toUpperCase()}`;
        // Locate or create sample digital package in storage
        const fileName = product?.files?.[0]?.fileName || `${item.slug || 'product'}_Installer_Signed.zip`;
        privateFilePath = path.join(config.STORAGE_DIR, fileName);

        if (!fs.existsSync(privateFilePath)) {
          fs.writeFileSync(privateFilePath, `NavasealStore Pro Genuine Verified Package\nOrder: ${order.orderNumber}\nLicensed to: ${order.customerEmail}\nIssued: ${new Date().toISOString()}\nDigital Signature: ${crypto.randomBytes(32).toString('hex')}\n`);
        }
      }

      const entitlement = {
        id: `ent-${crypto.randomUUID().slice(0, 8)}`,
        orderId: order.id,
        orderNumber: order.orderNumber,
        customerEmail: order.customerEmail,
        productId: item.productId,
        productTitle: item.productTitle,
        variantTitle: item.variantTitle,
        deliveryType: product?.deliveryType || item.deliveryType || 'INSTANT_FILE',
        deliveryContent: deliveryData,
        downloadToken: token,
        fileName: path.basename(privateFilePath || 'Package.zip'),
        filePath: privateFilePath,
        maxDownloads: product?.maxDownloads || 5,
        downloadCount: 0,
        expiresAt: expiresAt.toISOString(),
        isActive: true,
        createdAt: new Date().toISOString()
      };

      this.entitlements.set(token, entitlement);
      entitlementsCreated.push(entitlement);
    }

    return entitlementsCreated;
  }

  getEntitlementByToken(token) {
    return this.entitlements.get(token) || null;
  }

  getEntitlementsByOrderNumber(orderNumber) {
    return Array.from(this.entitlements.values()).filter(e => e.orderNumber === orderNumber);
  }

  // Validate and record download attempt
  recordDownload(token, { ipAddress, userAgent }) {
    const entitlement = this.entitlements.get(token);
    if (!entitlement) {
      throw new Error('Invalid download token. Access denied.');
    }

    if (!entitlement.isActive) {
      throw new Error('This download entitlement has been revoked or deactivated.');
    }

    if (new Date() > new Date(entitlement.expiresAt)) {
      throw new Error('This download token has expired. Please contact support @navaseal.');
    }

    if (entitlement.downloadCount >= entitlement.maxDownloads) {
      throw new Error(`Download limit of ${entitlement.maxDownloads} downloads exceeded.`);
    }

    entitlement.downloadCount += 1;
    const log = {
      id: `log-${crypto.randomUUID().slice(0, 8)}`,
      entitlementId: entitlement.id,
      downloadToken: token,
      orderNumber: entitlement.orderNumber,
      ipAddress: ipAddress || '127.0.0.1',
      userAgent: userAgent || 'Unknown User-Agent',
      downloadedAt: new Date().toISOString()
    };
    this.downloadLogs.push(log);

    return { entitlement, log };
  }
}

module.exports = new DeliveryService();

