import express, { Request, Response } from "express";
const router = express.Router();
import { searchPolicyByUsername } from "../middlewares/policies/searchPolicyByUsername";

router.get("/api/v1/policy", async (req: Request, res: Response) => {
  const userName = req.query.userName;
  if (userName) {
    try {
      // @ts-ignore
      const policy = await searchPolicyByUsername(userName);
      res.status(200).send({
        policy,
      });
    } catch (err) {
      res.status(500).send({
        message: "Something went wrong",
        error: err,
      });
    }
  }
});

export { router as policyRouter };
