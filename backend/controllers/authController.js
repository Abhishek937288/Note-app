import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import createSecretToken from "../utils/secretToken.js";

// get the user

// signUp router
export const signUp = async (req, res) => {
  let { userName, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({ message: "User already existed" });
  }
  password = await bcrypt.hash(password, 10);
  const newUser = new User({ userName, email, password });
  const savedUser = await newUser.save();
  const  {password:_,...userWithoutPassword}= savedUser._doc;
  res.json(userWithoutPassword);
};

// signIn router
export const signIn = async (req, res) => {};

// signOut router

export const signOut = async (req, res) => {};
