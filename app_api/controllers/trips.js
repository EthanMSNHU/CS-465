const mongoose = require ('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(reg, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec ();

            // Uncomment the following line to show results of querey
 
            console. log(q);
    
    if(!q)
    {
        return res
                .status(404)
                .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }

};

const tripsFindByCode = async(reg, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) // No filter, return all records
        .exec ();

            // Uncomment the following line to show results of querey
 
            console. log(q);
    
    if(!q)
    {
        return res
                .status(404)
                .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }

};

module.exports = {
    tripsList,
    tripsFindByCode

};

