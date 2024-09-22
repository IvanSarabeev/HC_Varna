import  express, { Application, ErrorRequestHandler, Request, Response } from "express";
import * as dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import csurf from "csurf";
import ExpressMongoSanitize from "express-mongo-sanitize";
import path from "path";
import helmet from "helmet";
import logger from './Utils/Logger';
import cors from "cors";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT ?? process.env.RESERVE_PORT;

// TODO: Update the SecurityPolicy
app.use(helmet({
    contentSecurityPolicy: false
}));
 
app.use(ExpressMongoSanitize()); // Data Sanitization against SQL Injection
const csrfProtection = csurf({ cookie: true });
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
}).on("error", (error) => {
    throw new Error(error.message);
});

// Defined Routes
app.get('/', (req: Request, res: Response) => {
    res.send("Hello TypeScript with Express");
});

// Compile the frontend dist

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Handle Errors
app.use((error: ErrorRequestHandler, req: Request, res: Response, next: Function) => {
    const statusCode = 500;
    const message = error + 'Internal Server Error!';

    logger.error(error);

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message, 
    });
});