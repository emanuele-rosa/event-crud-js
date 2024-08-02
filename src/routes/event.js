var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

var EventModel = require("../model/Events");
const {
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  listEvents,
  login,
} = require("../controllers/eventController");

let getEvents = (req, res, next) => {
  let id = req.params.id;
  let obj = EventModel.getElementById(id);
  if (obj == null) {
    res.status(404).json({ status: false, error: "The event was not found!" });
    return;
  }
  req.event = obj;
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

let validaToken = (req, res, next) => {
  let token = req.headers["authorization"];

  let cleanedToken = token.split(" ")[1];

  jwt.verify(cleanedToken, "#aBcDeFgH", (err, decoded) => {
    if (err) {
      res.status(401).json({ status: false, error: "Invalid token!" });
    } else {
      req.user = decoded.user;
      next();
    }
  });
};

router.post("/login", login);

router.get("/", validaToken, listEvents);

router.get("/:id", validaToken, getEvents, getEventById);

router.post("/", validaToken, validaNome, createEvent);

router.put("/:id", validaToken, validaNome, getEvents, updateEvent);

router.delete("/:id", validaToken, getEvents, deleteEvent);

module.exports = router;
