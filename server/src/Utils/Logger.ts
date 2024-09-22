import winston from "winston";
import path from "path";
import * as dotenv from "dotenv";
import winstonDaily from "winston-daily-rotate-file";

dotenv.config();

const logDir = path.resolve(__dirname, "../../logs");

const logFormat = winston.format.printf( ({ level, message, timestamp}) => {
    return `[${level}]: Time: ${timestamp} / Message: ${message}`;
});

const logger = winston.createLogger({
    level: process.env.APP_ENV === 'production' ? "error" : "debug",
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json(),
        logFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winstonDaily({
            dirname: logDir,
            filename: '%DATE%-combined.log',
            datePattern: 'YYYY-MM-DD',
            // maxFiles: '14d' // Keep logs available for 14 days
        })
    ]
});

if (process.env.APP_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

export default logger;