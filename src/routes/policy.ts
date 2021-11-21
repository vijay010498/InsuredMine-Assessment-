import express, { Request, Response } from "express";
const router = express.Router();
import { PolicyInfo } from "../models/PolicyInfo";

router.get("/api/v1/policy", async (req: Request, res: Response) => {
  const userName = req.query.userName;
  if (userName) {
    try {
      const userPolicy = await PolicyInfo.find({});
    } catch (err) {
      console.error(err);
      return res.status(400).send({
        message: "Something went wrong",
      });
    }
  }
});
