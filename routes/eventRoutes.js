const express = require("express");

const Event = require("../models/Event");
const protect = require("../middleware/authMiddleware");
const organizerOnly = require("../middleware/organizerMiddleware");

const router = express.Router();

// Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate(
      "createdBy",
      "name email"
    );

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Single Event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Create Event (Only Organizer)
router.post(
  "/",
  protect,
  organizerOnly,
  async (req, res) => {
    try {
      const event = await Event.create({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        createdBy: req.user._id,
      });

      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;