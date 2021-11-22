import { PolicyInfo } from "../../models/PolicyInfo";
import mongoose from "mongoose";

export const getAllPolicies = async () => {
  return new Promise(async function (resolve, reject) {
    try {
      const policies = await PolicyInfo.aggregate([
        {
          $lookup: {
            from: "policycarriers",
            localField: "policyCarrier",
            foreignField: "_id",
            as: "policyCarrier",
          },
        },
        {
          $lookup: {
            from: "policycategories",
            localField: "policyCategory",
            foreignField: "_id",
            as: "policyCategory",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
      ]);
      if (policies.length) {
        resolve(policies);
      } else {
        reject("No Policies Exists");
      }
    } catch (err) {
      reject(err);
    }
  });
};
