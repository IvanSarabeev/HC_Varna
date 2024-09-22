import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

export const transport = nodemailer.createTransport({
    host: '123',
    port: '',
    auth: {
        user: '',
        pass: ''
    }
});