/*
This file basically holds all the routes or endpoints in the server which is exported and used in index.ts file
 */

import express, { json } from "express"; //express framework and json import

import "express-async-errors"; //npm module used to write middleware in all the routes to validate the query,body and params check in the notesRoutes.ts file

import { errorhandler, NotFoundError } from "./errors"; //customized and serialized errors to catch any error in the server infra which prevents the request hell(request doesn't know what happened when server crashes)

//here we will import all the different routes in our server as of this exercise we have only one file
import { testRouter } from "./routes/test-route";
import { uploadRouter } from "./routes/upload";
import { policyRouter } from "./routes/policy";

const app = express(); //express framework

app.use(json()); //to access the req.body and communicate in the json format
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/assets"));

app.set("trust proxy", true); //This indicates the app is behind a front-facing proxy, and to use the X-Forwarded-* headers.Prevents the headers spoofing
app.set("view engine", "ejs");
app.set("views", "/Users/vijay/Desktop/vijay/assessments/insuremind/src/views");

app.use(testRouter); //making use of the route imported in the top
app.use(uploadRouter);
app.use(policyRouter);

app.use(errorhandler); //making use of the errorhandler imported top

export { app }; //named export to use in the index.js
