var express = require("express");
var router = express.Router();

const {
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  listEvents,
} = require("../controllers/eventController");

const { validaToken } = require("../helpers/auth");
const { findEvent } = require("../helpers/event");

router.get("/", validaToken, listEvents);

router.get("/:id", validaToken, getEventById);

router.post("/create", validaToken, validateName, createEvent);

router.put("/update/:id", findEvent, validaToken, validateName, updateEvent);

router.delete("/delete/:id", findEvent, validaToken, deleteEvent);

module.exports = router;
