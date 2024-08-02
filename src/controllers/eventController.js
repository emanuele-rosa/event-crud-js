const EventModel = require("../model/Events");
const jwt = require("jsonwebtoken");

exports.createEvent = async (req, res) => {
  try {
    res.json({
      status: true,
      event: EventModel.new(req.name, req.place, req.description),
    });
  } catch {
    res.json({
      status: false,
      error: "An error occurred while creating the event. Please, try again!",
    });
  }
};

exports.listEvents = async (req, res) => {
  if (EventModel.list().length > 0) {
    res.json({ status: true, list: EventModel.list() });
  } else {
    res.json({ status: false, error: "No events found!" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    res.json({ status: true, event: req.event });
  } catch {
    res.json({ status: false, error: "Event not found!" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    res.json({
      status: true,
      event: EventModel.update(
        req.event.id,
        req.name,
        req.place,
        req.description
      ),
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
    EventModel.delete(req.params.id);
    res.json({ status: true, oldEvent: req.event });
  } catch {
    res.json({
      status: false,
      error: "An error occurred during deletion. Please, try again!",
    });
  }
};