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

    if (event === null) {
      return res.json({ status: false, error: "Event not found!" });
    }

    res.json({ status: true, event: event });
  } catch {
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
  } catch {
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
  } catch {
    res.json({
      status: false,
      error: "An error occurred during deletion. Please, try again!",
    });
  }
};
