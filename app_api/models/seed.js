// Bring in the db conncetion and trip schema 
const Mongoose = require('./db');
const Trip = require('./travlr');

//Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));
//delete any existing recors, then inserts seed data 
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

//close the mongodb connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);

});