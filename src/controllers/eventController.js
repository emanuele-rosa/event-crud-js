const mongoose = require("mongoose");
const EventSchema = require("../model/Event");
const EventModel = mongoose.model("Event", EventSchema);

exports.createEvent = async (req, res) => {
  try {
    const { name, place, date, description } = req.body;
    const newEvent = new EventModel({ name, place, date, description });
    await newEvent.save();

    res.json({
      status: true,
      event: newEvent,
    });
  } catch {
    res.json({
      status: false,
      error: "An error occurred while creating the event. Please, try again!",
    });
  }
};

exports.listEvents = async (req, res) => {
  try {
    let events = await EventModel.find();
    res.json({ status: true, list: events });
  } catch (error) {
    res.json({ status: false, error: "No events found!" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    let event = await EventModel.findById(req.params.id);
    res.json({ status: true, event: event });
  } catch {
    res.json({ status: false, error: "Event not found!" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, place, date, description } = req.body;

    let obj = {};
    if (name) obj.name = name;
    if (place) obj.place = place;
    if (date) obj.date = date;
    if (description) obj.description = description;

    if (obj == {}) {
      return res.status(500).json(fail("No changes detected"));
    }

    EventModel.updateOne(id, obj).then((event) => {
      if (event) {
        res.json({ status: true, msg: "Event updated successfully!" });
      } else {
        res.json({ status: false, error: "Event not found!" });
      }
    });
  } catch {
    res.json({
      status: false,
      error: "An error occurred during the update! Please, try again!",
    });
  }
};

exports.deleteEvent = (req, res) => {
  try {
    const { id } = req.params;

    EventModel.findByIdAndDelete(id).then((event) => {
      if (event) {
        res.json({ status: true, msg: "Event deleted successfully!" });
      }
    });
  } catch {
    res.json({
      status: false,
      error: "An error occurred during deletion. Please, try again!",
    });
  }
};
