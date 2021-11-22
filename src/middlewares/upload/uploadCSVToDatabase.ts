import fs from "fs";
import csvParser from "csv-parser";
import { User } from "../../models/User";
import { Agent } from "../../models/Agent";
import { UserAccount } from "../../models/UserAccount";
import { PolicyCategory } from "../../models/PolicyCategory";
import { PolicyCarrier } from "../../models/PolicyCarrier";
import { PolicyInfo } from "../../models/PolicyInfo";

export const uploadCSVToDatabase = (filePath: fs.PathLike) => {
  const results: any[] = [];
  const header: any[] = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("headers", (headers) => {
      headers.map((head: any) => {
        header.push(head);
      });
    })
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", async () => {
      // Map with header index for O(N) access
      const headerMap = generateMapFromResults(header);
      const store = await storeAllCollections(results, headerMap);
      console.log(store);
    });
};

const generateMapFromResults = (headers: any[] = []) => {
  const indexMap = new Map();
  for (let i = 0; i < headers.length; i++) {
    // for User
    switch (headers[i]) {
      case "firstname":
        indexMap.set("firstName", i);
        break;
      case "dob":
        indexMap.set("DOB", i);
        break;
      case "address":
        indexMap.set("address", i);
        break;
      case "phone":
        indexMap.set("phoneNumber", i);
        break;
      case "state":
        indexMap.set("state", i);
        break;
      case "zip":
        indexMap.set("zip", i);
        break;
      case "email":
        indexMap.set("email", i);
        break;
      case "gender":
        indexMap.set("gender", i);
        break;
      case "account_type":
        indexMap.set("accountType", i);
        break;
    }
  }
  return indexMap;
};

const storeAllCollections = (
  results: any[],
  headerMap: Map<String, Number>
) => {
  return new Promise(async function (resolve, reject) {
    try {
      // indexes
      // const firstNameIndex = headerMap.get("firstName");
      // const DOBIndex = headerMap.get("DOB");
      // const addressIndex = headerMap.get("address");
      // const phoneNumberIndex = headerMap.get("phoneNumber");
      // const stateIndex = headerMap.get("state");
      // const zipIndex = headerMap.get("zip");
      // const emailIndex = headerMap.get("email");
      // const genderIndex = headerMap.get("gender");
      // const accountType = headerMap.get("accountType");

      const userMap = new Map();
      const userIDMap = new Map();
      const agentMap = new Map();
      const agentIDMap = new Map();
      const userAccountMap = new Map();
      const policyCategoryMap = new Map();
      const policyCategoryIDMap = new Map();
      const policyCarrierMap = new Map();
      const policyCompanyIDMap = new Map();
      for (let i = 0; i < results.length; i++) {
        // for user Collection
        if (!userMap.get(results[i].phone)) {
          const user = User.build({
            DOB: results[i].dob,
            accountType: results[i].account_type,
            address: results[i].address,
            email: results[i].email,
            firstName: results[i].firstname,
            gender: results[i].gender,
            phoneNumber: results[i].phone,
            state: results[i].state,
            zipCode: results[i].zip,
            accountName: results[i].account_name,
          });
          userMap.set(results[i].phone, true);
          await user.save(function (err, userT) {
            if (!userIDMap.get(results[i].phone))
              userIDMap.set(results[i].phone, userT._id);
          });
        }

        // AGENT
        const agent = results[i].agent;
        if (!agentMap.get(agent)) {
          const agentToSave = Agent.build({
            agentName: agent,
          });
          agentMap.set(agent, true);
          await agentToSave.save(function (err, agentT) {
            if (!agentIDMap.get(agent)) {
              agentIDMap.set(agent, agentT._id);
            }
          });
        }
        const accountName = results[i].account_name;
        if (!userAccountMap.get(accountName)) {
          const accountToSave = UserAccount.build({
            accountName,
          });
          userAccountMap.set(accountName, true);
          await accountToSave.save();
        }
        const policyCategory = results[i].category_name;
        if (!policyCategoryMap.get(policyCategory)) {
          const policyCategoryToSave = PolicyCategory.build({
            categoryName: policyCategory,
          });
          policyCategoryMap.set(policyCategory, true);
          await policyCategoryToSave.save(function (err, policyCat) {
            if (!policyCategoryIDMap.get(policyCategory)) {
              policyCategoryIDMap.set(policyCategory, policyCat._id);
            }
          });
        }
        // Policy carrier collection
        const policyCarrier = results[i].company_name;
        if (!policyCarrierMap.get(policyCarrier)) {
          const policyCarrierToSave = PolicyCarrier.build({
            companyName: policyCarrier,
          });
          policyCarrierMap.set(policyCarrier, true);
          await policyCarrierToSave.save(function (err, policyCarrierT) {
            if (!policyCompanyIDMap.get(policyCarrier)) {
              policyCompanyIDMap.set(policyCarrier, policyCarrierT._id);
            }
          });
        }
      }
      console.log(userIDMap);
      console.log(agentIDMap);
      console.log(policyCompanyIDMap);
      console.log(policyCategoryIDMap);
      await storePolicyInfo(
        results,
        policyCompanyIDMap,
        policyCategoryIDMap,
        userIDMap
      );
      resolve("ALL COLLECTION SAVED");
    } catch (err) {
      reject(err);
    }
  });
};

const storePolicyInfo = (
  results: any[],
  policyCompanyIDMap: Map<String, String>,
  policyCategoryIDMap: Map<String, String>,
  userIDMap: Map<String, String>
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const policyInfoMap = new Map();
      for (let i = 0; i < results.length; i++) {
        const policyNumber = results[i].policy_number;
        if (!policyInfoMap.get(policyNumber)) {
          const policyInfoToSave = PolicyInfo.build({
            policyCarrier:
              policyCompanyIDMap.get(results[i].company_name) || "",
            policyCategory:
              policyCategoryIDMap.get(results[i].category_name) || "",
            policyEndDate: results[i].policy_end_date,
            policyNumber,
            policyStartDate: results[i].policy_start_date,
            userId: userIDMap.get(results[i].phone) || "",
          });
          await policyInfoToSave.save();
          resolve("Policy INFO Collection Uploaded");
        }
      }
    } catch (err) {
      reject(err);
    }
  });
};
