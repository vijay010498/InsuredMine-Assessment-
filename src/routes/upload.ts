import express, { Request, Response } from "express";
const router = express.Router();

import { Upload } from "../controller/upload-controller";
import { Index } from "../controller/home-controller";

router.get("/", Index);
router.post(
  "/api/upload",
  Upload.single("file"),
  (req: Request, res: Response) => {
    console.log("FILE", req.file);
    res.status(200).send({
      message: "WORKING",
    });
  }
);

export { router as uploadRouter };
