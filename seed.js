const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

require('./app_server/db/mongoose');

const Trip = require('./app_server/models/trips');

// Read trips from JSON file
const tripsPath = path.join(
    __dirname,
    'public',
    'data',
    'trips.json'
);

const trips = JSON.parse(
    fs.readFileSync(tripsPath, 'utf8')
);

async function seedDB() {
    try {

        await Trip.deleteMany({});
        console.log('Existing trips removed');

        await Trip.insertMany(trips);
        console.log('Trips inserted successfully');

        mongoose.connection.close();

    } catch (err) {

        console.error('Seed error:', err);
        mongoose.connection.close();

    }
}

seedDB();