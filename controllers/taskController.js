const { default: mongoose } = require('mongoose')
const taskModel = require('../models/task')

const task = async(req, res) => {
    try{
        const {name, category,title,dateStart,dateEnd, priority, status, description, userId} = req.body
        if (!name || !title || !dateStart || !priority || !status || !userId) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }
        const taskItem = await taskModel.create({
            name,
            category,
            title,
            dateStart,
            dateEnd,
            priority,
            status,
            description,
            id: userId
        })
        res.json(taskItem)
    }catch(error){
        console.error("error creating task database", error)
        res.status(500).json(error)
    }
}

const getTaskById = async(req, res) => {
    const {userId} = req.query
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });}
    try{
        const tasks = await taskModel.find({id: new mongoose.Types.ObjectId(userId)})
        res.json({ success: true, data: tasks }); 
    }catch(error){
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ error: 'Error fetching tasks', details: error.message });
    }
}

const deleteTaskById = async(req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid user ID' })
    }
    try{
        const deletedTask = await taskModel.findByIdAndDelete(id)
        if(!deletedTask) {
            return res.status(404).json({error: 'task not found'})
        }
        res.json({ message: 'Task deleted successfully'})
    }catch(error){
        console.error("Error deleting tasks:", error)
        res.status(500).json({error: 'error deleting task'})
    }
}

const updateTaskById = async(req, res) => {
    const {id} = req.params
    const { name, category, title, dateStart, dateEnd, priority, status, description, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid task ID' });
    }

    try{
        const updatedTask = await taskModel.findByIdAndUpdate(id,{
            name,
            category,
            title,
            dateStart,
            dateEnd,
            priority,
            status,
            description,
            userId
        },{new: true})
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(updatedTask);
    }catch(error){
        console.error("Error updating task:", error);
        res.status(500).json({ error: 'Error updating task', details: error.message });
    }
}

// Get task count by user ID
const getTaskCountByUserId = async (req, res) => {
    const { userId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const taskCounts = await taskModel.aggregate([
            { $match: { id: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: '$category', count: { $sum: 1 } } } // Group by category and count
        ]);

        const counts = {};
        taskCounts.forEach(task => {
            counts[task._id] = task.count; // e.g., { "Work": 2, "Study": 1 }
        });

        res.json({ success: true, count: counts }); 
    } catch (error) {
        console.error("Error fetching task count:", error);
        return res.status(500).json({ error: 'Error fetching task count', details: error.message });
    }
};


module.exports = {task, getTaskById, deleteTaskById,updateTaskById, getTaskCountByUserId}