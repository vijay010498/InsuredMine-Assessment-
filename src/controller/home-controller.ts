import fs from "fs";
import * as path from "path";
import { Request, Response } from "express";

export const Index = async (req: Request, res: Response) => {
  try {
    res.render("home", {
      message: "TEST HOME",
    });
  } catch (err) {
    console.error(err);
  }
};
