import { User } from "../../models/User";
import { PolicyInfo } from "../../models/PolicyInfo";
import mongoose from "mongoose";

export const searchPolicyByUsername = async (userName: string) => {
  return new Promise(async function (resolve, reject) {
    try {
      const user = await User.findOne({
        accountName: userName,
      });
      if (user) {
        const accountId = user._id;
        const policies = await PolicyInfo.aggregate([
          {
            $match: {
              userId: mongoose.Types.ObjectId(accountId),
            },
          },
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
          resolve(policies[0]);
        } else {
          reject("No Policy found with the given username ");
        }
      } else {
        reject("No user exists with the given user name ");
      }
    } catch (err) {
      resolve(err);
    }
  });
};
