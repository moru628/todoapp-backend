const express = require('express')
const { register, login, getUserById, updateUser, addEvent,removeEvent, followFriend, unfollowFriend, getFollowedFriends} = require('../controllers/userController');
const router = express.Router()

//register route
router.post('/register', register)

//login route
router.post('/login', login)

//get user by id
router.get('/user/:id', getUserById)

//update user description
router.put('/user/:id', updateUser)

router.post('/user/event', addEvent)

router.delete('/user/event', removeEvent);

router.post('/follow', followFriend);

router.post('/unfollow', unfollowFriend);

router.get('/:id/followedFriends', getFollowedFriends);

module.exports = router;