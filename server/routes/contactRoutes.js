const express = require("express");
const ContactMessage = require("../models/ContactMessage");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, topic, message } = req.body;

    if (![name, email, topic, message].every((value) => typeof value === "string" && value.trim())) {
      return res.status(400).json({ message: "Please complete all contact form fields." });
    }
    if (
      name.trim().length > 100 ||
      email.trim().length > 254 ||
      topic.trim().length > 120 ||
      message.trim().length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return res.status(400).json({ message: "Please check your details and try again." });
    }

    const contactMessage = await ContactMessage.create({ name, email, topic, message });
    res.status(201).json({ message: "Your message has been received.", id: contactMessage._id });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Please check your details and try again." });
    }
    console.error("Contact message submission failed:", err);
    res.status(500).json({ message: "We couldn't send your message. Please try again later." });
  }
});

router.get("/", protect, authorize("admin"), async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).limit(100);
    res.json(messages);
  } catch (err) {
    console.error("Contact inbox could not be loaded:", err);
    res.status(500).json({ message: "Contact messages could not be loaded." });
  }
});

module.exports = router;
