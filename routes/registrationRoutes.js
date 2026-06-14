const express = require("express");

const Registration = require("../models/Registration");
const Event = require("../models/Event");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event Not Found",
      });
    }

    const exists =
      await Registration.findOne({
        user: req.user._id,
        event: eventId,
      });

    if (exists) {
      return res.status(400).json({
        message: "Already Registered",
      });
    }

    const registration =
      await Registration.create({
        user: req.user._id,
        event: eventId,
      });

    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/my", protect, async (req, res) => {
  const registrations =
    await Registration.find({
      user: req.user._id,
    })
      .populate("event")
      .populate("user", "name email");

  res.json(registrations);
});

router.delete(
  "/:id",
  protect,
  async (req, res) => {
    const registration =
      await Registration.findById(
        req.params.id
      );

    if (!registration) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    await registration.deleteOne();

    res.json({
      message:
        "Registration Cancelled",
    });
  }
);

module.exports = router;