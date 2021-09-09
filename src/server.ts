import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";

import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.json"

const port = 3000
const app = express()

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(express.json());
app.use(router);
app.use((err: Error, request : Request, response : Response, next: NextFunction) => {
    if(err instanceof Error){
        return response.status(400).json({
            error: err.message
        })
    }
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})
app.listen(port, () => console.log(`Server running on port ${port}`));