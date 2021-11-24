import express, { Request, Response } from "express";
const router = express.Router();

router.post("/api/v1/cron", async (req: Request, res: Response) => {
  const { message, timeStamp } = req.body;
});
