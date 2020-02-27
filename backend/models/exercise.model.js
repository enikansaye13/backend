const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    username: { type: String, required: true },
    caseid: {},
    // User._id,
    incident: { type: String, required: true },
    // date: { type: Date, default: Date.now },
    // time: { type: Number && String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: Number, required: true },
    register_date: {
        type:Date,
        default: Date.now
        }
  },
  {
    timestamps: true
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
