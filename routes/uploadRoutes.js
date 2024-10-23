const express = require('express');
const router = express.Router();
const { upload, uploadImage } = require('../controllers/uploadController');

// Upload Image Route
router.post('/upload-image/:id', upload, uploadImage);

module.exports = router;

