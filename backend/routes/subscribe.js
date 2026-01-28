import express from "express";
import { subscribe } from "../controllers/subscriberController.js";

const router = express.Router();

/**
 * @route  POST /api/subscribe
 * @desc   Subscribe a new email to the newsletter
 * @access Public
 */
router.post("/", subscribe);

export default router;