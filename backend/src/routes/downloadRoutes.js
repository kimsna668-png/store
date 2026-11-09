const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');

// Secure signed token download endpoint
router.get('/:token', downloadController.verifyAndDownload);
router.get('/info/:token', downloadController.getDownloadInfo);

module.exports = router;

