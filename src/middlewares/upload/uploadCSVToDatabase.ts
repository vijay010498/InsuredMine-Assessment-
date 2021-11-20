import fs from "fs";
import csvParser from "csv-parser";
import { User } from "../../models/User";

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
      console.log(header);
      console.log(results.length);
      // Map with header index for O(N) access
      const headerMap = generateMapFromResults(header);
      console.log(headerMap);
      console.log(typeof results);
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

      // Iterate through all the results / rows and  store in the collection
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
      }
      resolve("ALL COLLECTION SAVED");
    } catch (err) {
      reject(err);
    }
  });
};
