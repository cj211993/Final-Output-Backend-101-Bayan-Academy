const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    Category: {
        type: String,
        enum: ['deluxe', 'regular', 'king size'],
        lowercase: true
    },
})

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;