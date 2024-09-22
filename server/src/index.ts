import  express, { Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? process.env.RESERVE_PORT;

app.get('/', (req: Request, res: Response) => {
    res.send("Hello TypeScript with Express");
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})