import { User } from "../../models/User";

export const getAllUsers = async () => {
  return new Promise(async function (resolve, reject) {
    try {
      const users = await User.find({});
      if (users.length) {
        resolve(users);
      } else {
        reject("No users exists");
      }
    } catch (err) {
      reject(err);
    }
  });
};
