const express = require('express');
const router = express.Router();
const { post, getPostById, getAllPosts, deletePostById} = require('../controllers/postController');

router.post('/post', post); 
router.get('/post', getAllPosts); 
router.get('/post/:userId', getPostById);
router.delete('/post/:postId', deletePostById)

module.exports = router;
