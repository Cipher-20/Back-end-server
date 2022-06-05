
const mongoose = require('mongoose');
require('../models/User')

const dbName =  'Ads';
const connectionString = `mongodb://localhost:27017/${dbName}`

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DataBase connected');


        mongoose.connection.on('error', (err) => {
            console.error('DataBase error');
            console.error(err);
        })
    } catch (err) {
        console.error('Error connecting to database');
        console.error(err);
        process.exit(1);
    }


};
