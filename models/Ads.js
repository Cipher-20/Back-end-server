const { Schema, model, Types: { ObjectId } } = require('mongoose');

const namePattern = /^[a-zA-Z]+$/;
const emailPattern = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const adSchema = new Schema({
    headline: {
        type: String
        , minlength: [4, 'Headline must to be at least 4 characters long'],
        required: true
    },
    location: {
        type: String,
        minlength: [8, 'Location must to be at least 8 characters long'],
        required: true
    },
    companyName: {
        type: String,
        minlength: [3, 'Company name must to be at least 3 characters long'],
        required: true
    },
    companyDescription: {
        type: String, 
        max: [40,'Company description must to be max 40 characters long' ] ,
        required: true
    },
    applied: { type: [ObjectId], ref: 'User', default: [] },
    author: { type: ObjectId, ref: 'User', required: true },
});

const Ads = model('Ads', adSchema);

module.exports = Ads;