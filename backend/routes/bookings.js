import express from "express";
import { Booking } from "../models/index.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// ➕ Create a new booking
router.post("/", auth, async (req, res) => {
  try {
    const { topic, date, message } = req.body;

    if (!topic || !date) {
      return res.status(400).json({ error: "Topic and date are required" });
    }

    const booking = await Booking.create({
      topic,
      date,
      message,
      userId: req.userId,
    });

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 📋 Get all bookings for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.userId },
      order: [["date", "DESC"]],
    });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
