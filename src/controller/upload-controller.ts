import * as path from "path";
import multer from "multer";
import { Request } from "express";

// use of storage
const storage = multer.diskStorage({
  destination: (req: Request, file, callback) => {
    callback(
      null,
      "/Users/vijay/Desktop/vijay/assessments/insuremind/src/uploads/"
    );
  },
  filename(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const Upload = multer({
  storage,
});
