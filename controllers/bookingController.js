// routers/bookingRoutes.js
const express = require('express');
const bookingModel = require('../models/booking');
const router = express.Router();

const getBookingInfo = async (req, res) => {
  const { eventId, eventName, category, location, date, userName, email, time } = req.body;

  try {
    const newBooking = new bookingModel({
      event: {
        id: eventId,
        name: eventName,
        category: category,
        location: location,
        date: date,
      },
      user: {
        name: userName,
        email: email,
        time: time,
      },
    });
    
    await newBooking.save();
    res.status(201).json({ message: 'Booking successfully created', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

module.exports = {getBookingInfo};
