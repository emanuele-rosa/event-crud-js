var express = require("express");
var router = express.Router();

const {
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  listEvents,
  getEventByUser,
} = require("../controllers/eventController");

const { validateToken } = require("../helpers/auth");
const { findEvent, validateName } = require("../helpers/event");

router.get("/", validateToken, listEvents);

router.get("/byUser", getEventByUser);

router.get("/:id", validateToken, getEventById);

router.post("/create", validateToken, validateName, createEvent);

router.put("/update/:id", validateToken, findEvent, validateName, updateEvent);

router.delete("/delete/:id", validateToken, findEvent, deleteEvent);

module.exports = router;
