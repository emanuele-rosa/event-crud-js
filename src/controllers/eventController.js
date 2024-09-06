const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const EventSchema = require("../model/Event");
const EventModel = mongoose.model("Event", EventSchema);
const UserSchema = require("../model/User");
const UserModel = mongoose.model("User", UserSchema);

exports.createEvent = async (req, res) => {
  try {
    let token = req.headers["authorization"];

    let cleanedToken = token.split(" ")[1];

    const decoded = jwt.verify(
      cleanedToken,
      process.env.NEXT_PUBLIC_SECRET_KEY
    );
    const author = await UserModel.findOne({ email: decoded?.name });

    const { name, place, date, description } = req.body;
    const newEvent = new EventModel({
      name,
      place,
      date,
      description,
      createdBy: author.id,
    });
    await newEvent.save();

    return res.json({
      status: true,
      event: newEvent,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: "An error occurred while creating the event. Please, try again!",
    });
  }
};

exports.listEvents = async (req, res) => {
  try {
    let events = await EventModel.find();
    return res.json({ status: true, list: events });
  } catch (error) {
    return res.json({ status: false, error: "No events found!" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    let event = await EventModel.findById(req.params.id);

    if (event === null) {
      return res.status(404).json({ status: false, error: "Event not found!" });
    }

    res.json({ status: true, event: event });
  } catch (error) {
    res.json({ status: false, error: "An error occurred. Please try again!" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, place, date, description } = req.body;

    const newEvent = {
      name: name,
      place: place,
      date: date,
      description: description,
    };

    await EventModel.findByIdAndUpdate(id, newEvent);

    res.json({ status: true, msg: "Event updated successfully!" });
  } catch (error) {
    res.json({
      status: false,
      error: "An error occurred during the update! Please, try again!",
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    await EventModel.findByIdAndDelete(id).then((event) => {
      if (event) {
        res.json({ status: true, msg: "Event deleted successfully!" });
      }
    });
  } catch (error) {
    res.json({
      status: false,
      error: "An error occurred during deletion. Please, try again!",
    });
  }
};
