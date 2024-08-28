const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});

module.exports = EventSchema;