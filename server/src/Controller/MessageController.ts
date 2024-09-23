import { Request, Response } from "express";
import { sendEmailResponse } from "service/Email";
import logger from "utils/Logger";
import { INTERNAL_SERVER_ERROR } from "utils/ResponseStatus";

export const handleContactMessage = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, phone, message } = req.body;

        const response = await sendEmailResponse({ firstName, lastName, email, phone, message});

        return response
            ? res.status(200).json(response)
            : res.status(400).json({ status: false, message: "Failed to send email" })
        ;
    } catch (error) {
        logger.warn("Fatal Error: ", error);

        res.status(500).json({
            status: false,
            message: INTERNAL_SERVER_ERROR
        })
    }
};