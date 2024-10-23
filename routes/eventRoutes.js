const express = require("express")
const router = express.Router()
const {getAllEvents, getEventById} = require('../controllers/eventController')

router.get('/event', getAllEvents)
router.get('/event/:id', getEventById)

module.exports = router;