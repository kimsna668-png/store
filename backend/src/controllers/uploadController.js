const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const config = require('../config/env');

// Multer storage for public images
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(config.UPLOAD_DIR)) {
      fs.mkdirSync(config.UPLOAD_DIR, { recursive: true });
    }
    cb(null, config.UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
    cb(null, unique);
  }
});

const imageFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid image format. Allowed: JPG, PNG, WEBP, GIF'), false);
  }
};

const uploadImageMiddleware = multer({
  storage: imageStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: imageFilter
});

// Multer storage for private digital files
const privateFileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(config.STORAGE_DIR)) {
      fs.mkdirSync(config.STORAGE_DIR, { recursive: true });
    }
    cb(null, config.STORAGE_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = `pkg-${Date.now()}-${crypto.randomBytes(8).toString('hex')}${ext}`;
    cb(null, unique);
  }
});

const uploadDigitalFileMiddleware = multer({
  storage: privateFileStorage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});

// Handlers
const handleImageUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: 'error', message: 'No image file uploaded.' });
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    status: 'success',
    message: 'Image uploaded successfully.',
    data: {
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
      url: fileUrl
    }
  });
};

const handleDigitalFileUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: 'error', message: 'No digital package uploaded.' });
  }

  res.json({
    status: 'success',
    message: 'Digital product file secured in private storage.',
    data: {
      storageKey: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
      storagePath: `storage/digital_files/${req.file.filename}`
    }
  });
};

module.exports = {
  uploadImageMiddleware,
  uploadDigitalFileMiddleware,
  handleImageUpload,
  handleDigitalFileUpload
};

