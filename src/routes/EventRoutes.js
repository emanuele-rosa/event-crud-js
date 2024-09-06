var express = require("express");
var router = express.Router();

const {
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  listEvents,
} = require("../controllers/eventController");

const { validateToken } = require("../helpers/auth");
const { findEvent, validateName } = require("../helpers/event");

router.get("/", validateToken, listEvents);

router.get("/:id", validateToken, getEventById);

router.post("/create", validateToken, validateName, createEvent);

router.put("/update/:id", findEvent, validateToken, validateName, updateEvent);

router.delete("/delete/:id", findEvent, validateToken, deleteEvent);

module.exports = router;
