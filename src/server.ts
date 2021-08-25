import "reflect-metadata";
import express from "express";
import { router } from "./routes";

import "./database"; //From: index.ts (database)

const port = 3000
const app = express()

app.use(express.json());
app.use(router);
app.listen(port, () => console.log(`Server running on port ${port}`));