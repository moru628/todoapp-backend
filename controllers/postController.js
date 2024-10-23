const postModel = require('../models/post')
const registerModel = require('../models/register'); 
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../upload'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage }).single('postImage');

const post = async (req, res) => {
    // Ensure that multer processed the file before handling the request
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: "File upload failed", err });
      }
  
      const { title, userId } = req.body;
      const imagePath = req.file ? req.file.filename : null;
  
      console.log('Request Body:', req.body);
      console.log('User ID:', userId);
  
      if (!imagePath) {
        return res.status(400).json({ error: "File upload failed" });
      }
  
      try {
        const user = await registerModel.findById(userId)
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        console.log('User:', user);
        console.log('User Name:', user.name);
        console.log('User Profile Image:', user.profileImg);
        const postItem = await postModel.create({
          title,
          imageUrl: imagePath,
          user: userId,
          name: user.name, 
          profileImg: user.profileImg
        });
  
        res.json(postItem);
        console.log('Created Post:', postItem);
      } catch (error) {
        console.error('Error creating post in the database', error);
        res.status(500).json({ error: "Failed to create post" });
      }
    });
  };

const getPostById = async(req, res) => {
    try{
        const{userId} = req.params
        const posts = await postModel.find({ user: userId })
        res.json(posts)
    }catch(error){
        console.error('error fetching posts', error)
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
}

const getAllPosts = async (req, res) => {
    try{
      const posts = await postModel.find()
      res.json(posts)
    } catch(error){
        console.error('Error fetching all posts', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
}

const deletePostById = async(req, res) => {
  const{postId} = req.params
  try{
    const deletedPost = await postModel.findByIdAndDelete(postId)
    if(!deletedPost){
      return res.status(404).json({error: 'post not found'})
    }
    res.json({ message: 'Post deleted successfully' });
  }catch(error){
    console.error("error deleting posts:", error)
    res.status(500).json({error:'error deleting post'})
  }
}

module.exports = { post, getPostById, getAllPosts,deletePostById };