import Subscriber from "../models/Subscriber.js";
import { sendWelcomeEmail } from "../services/mailService.js";

/**
 * @desc    Subscribe to newsletter
 * @route   POST /api/subscribe
 * @access  Public
 */
export const subscribe = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // if already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ message: "You are already subscribed!" });
        }

        // else create new
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        sendWelcomeEmail(email).catch((err) => console.error("Failed to send welcome email:", err));

        res.status(201).json({ message: "Successfully subscribed to the newsletter!" });
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ message: messages[0] });
        }
        console.error("Subscription error:", error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
};