import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger_output.json";
import "./database"; //From: index.ts (database)
import { router } from "./routes";

dotenv.config()

const port = process.env.PORT
const app = express()

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(express.json())
app.use(router);
// app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
//     if (err instanceof Error) {
//         return response.status(400).json({
//             error: err.message
//         })
//     }
//     return response.status(500).json({
//         status: "error",
//         message: "Internal Server Error"
//     })
// })

app.listen(port, () => console.log(`Server running on port ${port}`));