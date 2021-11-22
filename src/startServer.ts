import { app } from "./app";
import mongoose from "mongoose";
import { DatabaseConnectionError } from "./errors/database-connection-error";
import osUtils from "os-utils";
const MAX_CPU_USAGE = 70;
const keys = require("./config/keys");
const startServer = async () => {
  if (process.env.NODE_ENV) {
    if (!process.env.mongoURI) {
      throw new Error("MONGOURI must be defined");
    }
  }
  try {
    await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to Mongo Database");
  } catch (err) {
    console.log(err);
    throw new DatabaseConnectionError();
  }
  setInterval(() => {
    console.log("*********************************");
    console.log("Platform: " + osUtils.platform());
    console.log("Number of CPUs: " + osUtils.cpuCount());
    console.log("Free Memory: " + osUtils.freemem());
    console.log("Total Memory: " + osUtils.totalmem());
    console.log("Free Memory Percentage: " + osUtils.freememPercentage());
    console.log("Server Up-Time: " + osUtils.sysUptime());
    osUtils.cpuUsage(function (v) {
      console.log("CPU Usage (%) : " + v);
      if (v > MAX_CPU_USAGE) {
        console.log("Server Usage is more than " + MAX_CPU_USAGE);
        process.exit(0);
      }
    });
    console.log("*********************************");
  }, 3000);

  const PORT = process.env.PORT || 2000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

startServer();
