var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

// var EventModel = require("../model/Events");

const EventSchema = require("../model/Event");
const EventModel = mongoose.model("Event", EventSchema);
const {
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  listEvents,
} = require("../controllers/eventController");

const { validaToken } = require("../helpers/auth");

let getEvents = (req, res, next) => {
  try {
    let { id } = req.params;
    let obj = EventModel.getById(id);

    req.event = obj;
  } catch (error) {
    res.status(404).json({ status: false, error: "The event was not found!" });
    return;
  }
  next();
};

let validaNome = (req, res, next) => {
  let { name, description, place } = req.body;
  if (name == undefined || name == null || name == "") {
    res
      .status(400)
      .json({ status: false, error: "The name of the event is required!" });
  }

  if (name.length < 3) {
    res.status(400).json({
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
};

router.get("/", validaToken, listEvents);

router.get("/:id", validaToken, getEvents, getEventById);

router.post("/create", validaToken, validaNome, createEvent);

router.put("/update", validaToken, getEvents, validaNome, updateEvent);

router.delete("/delete/:id", getEvents, validaToken, deleteEvent);

module.exports = router;
