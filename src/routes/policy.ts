import express, { Request, Response } from "express";
const router = express.Router();
import { searchPolicyByUsername } from "../middlewares/policies/searchPolicyByUsername";
import { getAllUsers } from "../middlewares/user/user";
import { aggregatePolicyForUser } from "../middlewares/policies/aggregatePolicyForUser";
import { getAllPolicies } from "../middlewares/policies/policy";

router.get("/api/v1/policy", async (req: Request, res: Response) => {
  const userName = req.query.userName;
  try {
    if (userName) {
      // @ts-ignore
      const policy = await searchPolicyByUsername(userName);
      return res.status(200).send({
        policy,
      });
    } else {
      const policies = await getAllPolicies();
      // @ts-ignore
      const aggregatedPolicies = await aggregatePolicyForUser(policies);
      return res.status(200).send({
        aggregatedPolicies,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Something went wrong",
      error: err,
    });
  }
});

export { router as policyRouter };
