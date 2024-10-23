const express = require("express")
const router = express.Router()
const {getBookingInfo} = require('../controllers/bookingController')

router.post('/booking', getBookingInfo)

module.exports = router;