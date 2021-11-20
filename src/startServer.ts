import { app } from "./app";
import mongoose from "mongoose";
import { DatabaseConnectionError } from "./errors/database-connection-error";

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
  } catch (err) {
    console.log(err);
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

startServer();
