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
      await storeAllCollections(results, headerMap);
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

      const agentMap = new Map();
      const userAccountMap = new Map();
      for (let i = 0; i < results.length; i++) {
        // for user Collection
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
        });
        await user.save();
        // AGENT
        const agent = results[i].agent;
        if (!agentMap.get(agent)) {
          const agentToSave = Agent.build({
            agentName: agent,
          });
          agentMap.set(agent, true);
          await agentToSave.save();
        }
        const accountName = results[i].account_name;
        if (!userAccountMap.get(accountName)) {
          const accountToSave = UserAccount.build({
            accountName,
          });
          userAccountMap.set(accountName, true);
          await accountToSave.save();
        }
      }
      resolve("ALL COLLECTION SAVED");
    } catch (err) {
      reject(err);
    }
  });
};
