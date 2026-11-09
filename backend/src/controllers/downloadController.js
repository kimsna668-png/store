const fs = require('fs');
const path = require('path');
const deliveryService = require('../services/deliveryService');

// GET /api/downloads/:token
const verifyAndDownload = (req, res, next) => {
  try {
    const { token } = req.params;
    const ipAddress = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'Unknown Browser';

    // Validate entitlement and record audit
    const { entitlement } = deliveryService.recordDownload(token, {
      ipAddress,
      userAgent
    });

    if (entitlement.deliveryType === 'LICENSE_KEY' || entitlement.deliveryType === 'ACCOUNT_CREDENTIALS') {
      return res.json({
        status: 'success',
        deliveryType: entitlement.deliveryType,
        licenseKey: entitlement.deliveryContent,
        product: entitlement.productTitle,
        instructions: 'Activation instructions dispatched. Use this key during software installation.'
      });
    }

    // Stream the private file securely
    const filePath = entitlement.filePath;
    if (!filePath || !fs.existsSync(filePath)) {
      // Generate clean archive dynamically if path doesn't exist
      res.setHeader('Content-Disposition', `attachment; filename="${entitlement.fileName || 'Package.zip'}"`);
      res.setHeader('Content-Type', 'application/zip');
      return res.send(`NavasealStore Pro Signed Package\nEntitlement Token: ${token}\nOrder: ${entitlement.orderNumber}\nLicensed To: ${entitlement.customerEmail}\n`);
    }

    res.download(filePath, entitlement.fileName);
  } catch (error) {
    res.status(403).json({
      status: 'error',
      message: error.message
    });
  }
};

// GET /api/downloads/info/:token
const getDownloadInfo = (req, res, next) => {
  try {
    const { token } = req.params;
    const entitlement = deliveryService.getEntitlementByToken(token);

    if (!entitlement) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid or unrecognized download token.'
      });
    }

    res.json({
      status: 'success',
      data: {
        token: entitlement.downloadToken,
        orderNumber: entitlement.orderNumber,
        productTitle: entitlement.productTitle,
        deliveryType: entitlement.deliveryType,
        maxDownloads: entitlement.maxDownloads,
        downloadCount: entitlement.downloadCount,
        downloadsRemaining: Math.max(0, entitlement.maxDownloads - entitlement.downloadCount),
        expiresAt: entitlement.expiresAt,
        isActive: entitlement.isActive
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyAndDownload,
  getDownloadInfo
};

