import express from 'express';
import { handleContactMessage } from 'controller/MessageController';

const router = express.Router();

router.post("/contact-message", handleContactMessage);

export default router;