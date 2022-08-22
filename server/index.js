import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import db from "./db/db.js";
import route from "./routes/routes.js";

const app = express();

import("./middleware/auth.js");

const PORT = process.env.PORT || 5000;

db();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use("/", route);
app.listen(PORT, () => console.log("server running on port 5000"));
