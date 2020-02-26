const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    // googleId: String

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
        
    },
    firstname: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    lastname: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    phonenumber: {
        type: Number,
        require: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },

}, {
    timestamps: true,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
