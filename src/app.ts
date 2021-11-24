import express, { json } from "express";

import "express-async-errors";

import { errorhandler } from "./errors";

import { testRouter } from "./routes/test-route";
import { uploadRouter } from "./routes/upload";
import { policyRouter } from "./routes/policy";

const app = express();

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/assets"));

app.set("trust proxy", true);
app.set("view engine", "ejs");
app.set("views", "/Users/vijay/Desktop/vijay/assessments/insuremind/src/views");

app.use(testRouter);
app.use(uploadRouter);
app.use(policyRouter);

app.use(errorhandler);

export { app };
