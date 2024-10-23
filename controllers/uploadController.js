const multer = require('multer');
const path = require('path');
const registerModel = require('../models/register');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../upload'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage }).single('profileImg');

// Upload Image Route
const uploadImage = async (req, res) =>{
    const { id } = req.params;
    const imagePath = req.file ? req.file.filename : null; 
    console.log('Request Body:', req.body);
    console.log('User ID:', id);
    console.log('File:', req.file);

    if (!imagePath) {
        return res.status(400).json({ error: "File upload failed" });
    }

    try {
        const user = await registerModel.findByIdAndUpdate(
            id,
            { profileImg: imagePath },
            { new: true } 
        );
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "Image uploaded successfully", user });
    } catch (err) {
        console.error("Error uploading image:", err);
        res.status(500).json({ error: "Failed to upload image" });
    }
};

module.exports = { upload, uploadImage };