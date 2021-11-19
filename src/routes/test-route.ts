import express, { Request, Response } from "express";
import { validateRequest } from "../middlewares/common/validate-request";
const router = express.Router();

router.get("/api/test", async (req: Request, res: Response) => {
  res.status(200).send({
    message: "Test Success",
  });
  return;
});

export { router as testRouter };
