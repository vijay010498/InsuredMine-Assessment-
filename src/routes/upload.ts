import express, { Request, Response } from "express";
const router = express.Router();

import { Upload } from "../controller/upload-controller";
import { Index } from "../controller/home-controller";
import { uploadCSVToDatabase } from "../middlewares/upload/uploadCSVToDatabase";

router.get("/", Index);
router.post(
  "/api/upload",
  Upload.single("file"),
  async (req: Request, res: Response) => {
    console.log("FILE", req.file);
    await uploadCSVToDatabase(
      "/Users/vijay/Desktop/vijay/assessments/insuremind/src/uploads/" +
        req.file?.filename
    );
    res.status(200).send({
      message: "WORKING",
    });
  }
);

export { router as uploadRouter };
