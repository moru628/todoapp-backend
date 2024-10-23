const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  event: {
    id: String,
    name: String,
    category: String,
    location: String,
    date: String,
  },
  user: {
    name: String,
    email: String,
    time: String,
  },
});

const Booking = mongoose.model('bookings', bookingSchema);
module.exports = Booking;
