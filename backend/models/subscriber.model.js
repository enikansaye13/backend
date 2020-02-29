const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = new Schema({

email:{
    type: String,
    require:true,
    unique: true,
    trim: true,
    
}
}, {
timestamps:true,
});

const Subscriber = mongoose.model('Subscriber' , subscriberSchema);

module.exports = Subscriber;
