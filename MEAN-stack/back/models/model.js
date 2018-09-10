const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Issue = new Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
    country: {
        type: String
    },
    gender:{
        type: String
    }
});

module.exports = mongoose.model('Issue', Issue);