const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: {type: String, required: true},
    clientid: {type: Number, required: true},
    incident: {type: String, required: true},
    date: {type: Date, default: Date.now},
    time: {type: Number && String, required: true},
    status: {type: String, required: true},
    description: {type: String, required: true}, 
    location: {type: String, required: true},
    duration: {type: Number, required: true}, 
      

}, {
    timestamps:true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;