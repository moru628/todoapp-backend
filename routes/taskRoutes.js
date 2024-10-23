const express = require('express')
const {task,getTaskById,deleteTaskById,updateTaskById,getTaskCountByUserId} = require('../controllers/taskController')
const router = express.Router()

router.post('/task',task)
router.get('/task', getTaskById)
router.delete('/task/:id', deleteTaskById)
router.put('/task/:id', updateTaskById);
router.get('/task/count', getTaskCountByUserId);

module.exports = router