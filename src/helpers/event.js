const mongoose = require("mongoose");
const EventShema = require("../model/Event");
const EventModel = mongoose.model("Event", EventShema);

exports.findEvent = async (req, res, next) => {
  try {
    let { id } = req.params;

    const event = await EventModel.findById(id);

    if (event === null) {
      return res
        .status(404)
        .json({ status: false, error: "Event doesn't exists" });
    }

    next();
  } catch (error) {
    return res.status(404).json({
      status: false,
      error: "An error occurred while locating the event",
    });
  }
};

exports.validateName = (req, res, next) => {
  try {
    let { name, description, place } = req.body;
    if (name == undefined || name == null || name == "") {
      res
        .status(400)
        .json({ status: false, error: "The name of the event is required!" });
    }

    if (name.length < 3) {
      return res.status(400).json({
        status: false,
        error: "The name of the event must have at least 3 characters!",
      });
    }

    if (place == undefined || place == null || place == "") {
      res
        .status(400)
        .json({ status: false, error: "The place of the event is required!" });
    }

    req.name = name;
    req.description = description;
    req.place = place;
    next();
  } catch (error) {
    return res.status(400).json({
      status: false,
      error: "An error occurred while validating the event",
    });
  }
};
