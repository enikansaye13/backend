const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // googleId: String

username:{
    type: String,
    require:true,
    unique: true,
    trim: true,
    minlength:3
},
email:{
    type: String,
    require:true,
    unique: true,
    trim: true
    
},
password:{
    type: String,
    require:true,

},
register_date: {
type:Date,
default: Date.now
}
}, {
timestamps:true,
});

const User = mongoose.model('User' , userSchema);

module.exports = User;
