import express from 'express';
import { handleContactMessage } from 'controller/MessageController';
import { validate, validateCustomerInquery } from './../Utils/Constraints';

const router = express.Router();

router.post("/contact-message", validateCustomerInquery(), validate, handleContactMessage);

export default router;