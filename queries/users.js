import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user-model";
import bcrypt from "bcryptjs/dist/bcrypt";

export async function getUserByEmail(email) {
  const user = await User.findOne({ email: email }).select("-password").lean();

  return replaceMongoIdInObject(user);
}

export async function validatePassword(email, oldPassword) {
  const user = await getUserByEmail(email);
  const isMatch = await bcrypt.compare(oldPassword, user.password);

  return isMatch;
}
