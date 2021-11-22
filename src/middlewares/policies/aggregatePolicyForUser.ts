import { PolicyInfo } from "../../models/PolicyInfo";

export const aggregatePolicyForUser = async (policies: any[]) => {
  return new Promise(async function (resolve, reject) {
    try {
      const policiesMap = {};
      for (let i = 0; i < policies.length; i++) {
        console.log(policies[i]);
        // @ts-ignore
        if (!policiesMap[policies[i].user[0]._id]) {
          // @ts-ignore
          policiesMap[policies[i].user[0]._id] = [policies[i]];
        } else {
          // @ts-ignore
          policiesMap[policies[i].user[0]._id] = [
            // @ts-ignore
            ...policiesMap[policies[i].user[0]._id],
            policies[i],
          ];
        }
      }
      resolve(policiesMap);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};
