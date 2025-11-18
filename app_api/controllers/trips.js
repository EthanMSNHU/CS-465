const mongoose = require('mongoose');
require('../models/travlr'); // Register the model
const Trip = mongoose.model('Trip');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();
    res.status(200).json(trips);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

// GET: /trips/:tripCode
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip.find({ code: req.params.tripCode }).exec();
    res.status(200).json(trip);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

// POST: /trips
const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = new Trip({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

// PUT: /trips/:tripCode
const tripsUpdateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true }
    ).exec();
    res.status(201).json(updatedTrip);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};