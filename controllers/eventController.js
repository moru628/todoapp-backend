const EventModel = require('../models/event')

const getAllEvents = async(req, res) => {
    try{
        console.log("Fetching event with ID:", req.params.id); 
        const events = await EventModel.find()
        res.status(200).json(events)
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const getEventById = async(req, res) => {
    try{
        const event = await EventModel.findById(req.params.id);
        if (!event) {
          return res.status(404).send('Event not found');
        }
        res.json(event);
    }catch(error){
        res.status(500).send('Server error');
    }
}

module.exports = {getAllEvents, getEventById}