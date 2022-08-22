import joi from "joi";
import User from "../models/userModel.js";

async function validateUserData(data) {
  const userSchema = joi.object({
    username: joi.string().min(4).max(20).required().trim().label("Username"),
    email: joi.string().email().required().label("Email"),
    password: joi.string().min(5).max(20).required().trim().label("Password"),
  });
  const { error } = userSchema.validate(data);
  if (error)
    return {
      source: error.details[0].path[0],
      message: error.details[0].message,
    };

  if (await isUsed({ username: data.username }))
    return {
      source: "username",
      message: "Username already used",
    };
  if (await isUsed({ email: data.email }))
    return {
      source: "email",
      message: "Email already used",
    };
  return null;
}

export default validateUserData;

async function isUsed(property) {
  try {
    const res = await User.find(property);
    if (res.length > 0) return true;
    return false;
  } catch (error) {
    console.log(error);
  }
}
