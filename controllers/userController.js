const bcrypt = require('bcrypt')
const registerModel = require('../models/register')

const register = async(req,res) => {
    try{
        const {password, ...otherFields} = req.body
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await registerModel.create({
            ...otherFields,
            password:hashedPassword
        })
        res.json(user)
    }catch(error){
        console.error("Error creating user:", error)
        res.status(500).json(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await registerModel.findOne({ email: email });
        
        if (user) {
            const result = await bcrypt.compare(password, user.password);
            
            if (result) {
                res.json({
                    message: "success",
                    userId: user._id,
                    userName: user.name,
                    profile: user.profileImg || "",
                    description: user.description || "",
                    topic: user.topic || "",
                    post: user.post || []
                });
            } else {
                res.json("The password is incorrect");
            }
        } else {
            res.json("No record exists");
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err });
    }
}

const getUserById = async(req, res)=>{
    const{ id } = req.params
    console.log("user id:", id)

    try{
        const user = await registerModel.findById(id)
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        res.json(user)
    }catch(error){
        res.status(500).json({error:"Error fetching user"})
    }
}

const updateUser = async(req, res)=>{
    const {id} = req.params
    const {name, description} = req.body

    try{
        const updatedUser = await registerModel.findOneAndUpdate(
            { _id: id },
            {description, name},
            {new: true}
        )

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(updatedUser);
    }catch (error) {
        res.status(500).json({ error: "Failed to update user description" });
    }
}

const addEvent = async(req, res) => {
   const {userId, eventImageUrl} = req.body
    try{
        const updatedUser = await registerModel.findByIdAndUpdate(
            userId,
            { $push: { topic: eventImageUrl } },
            { new: true } 
        )

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Event added successfully", updatedUser });
    }catch(error){
        res.status(500).json({ error: "Failed to update user events" });
    }
}

const removeEvent = async(req, res) => {
    const {userId, eventImageUrl} = req.body
    try{
        const updatedUser = await registerModel.findById(userId)
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        updatedUser.topic = updatedUser.topic.filter(event => event !== eventImageUrl);
        await updatedUser.save();

        res.status(200).json({ message: "Event removed successfully", updatedUser });
    }catch(error){
        res.status(500).json({ error: "Failed to remove event" });
    }
}

const followFriend = async (req, res) => {
    const { userId, friendId } = req.body;

    try {
        const friend = await registerModel.findById(friendId).select('name profileImg');

        if (!friend) {
            return res.status(404).json({ error: "Friend not found" });
          }

        const user = await registerModel.findByIdAndUpdate(
            userId,
            { $addToSet: { followedFriends: friendId } },
            { new: true }
        ).populate('followedFriends', 'name profileImg');

        res.status(200).json({ ...friend._doc, message: "Successfully followed!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to follow friend" });
    }
};

const unfollowFriend = async (req, res) => {
    const { userId, friendId } = req.body;

    try {
        const user = await registerModel.findByIdAndUpdate(
            userId,
            { $pull: { followedFriends: friendId } },
            { new: true }
        ).populate('followedFriends', 'name profileImg');

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to unfollow friend" });
    }
};

const getFollowedFriends = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await registerModel.findById(id).populate('followedFriends', 'name profileImg');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ followedFriends: user.followedFriends });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch followed friends" });
    }
};

module.exports = {
    register,
    login,
    getUserById,
    updateUser,
    addEvent,
    removeEvent,
    followFriend,
    unfollowFriend,
    getFollowedFriends
};