import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import {genTokenAndSetCookie} from "../utils/secretToken.js"


export const signUp = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || password.length <= 6) {
    return res
      .status(400)
      .json({ data: null, success: true, message: "please fill all fileds" });
  }


  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({
      data: null,
      success: false,
      message: "User already existed",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = await new User({
    userName,
    email,
    password: hashPassword,
  }).save();
  const { password: _, ...userWithoutPassword } = newUser._doc;
  // jwt .sign()
  genTokenAndSetCookie(newUser.id,res);

  res.status(201).json({
    data: userWithoutPassword,
    success: true,
    message: "User singedUp sucssfully",
  });
};


export const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || password <= 6 ) {
    return res.json({
      data: null,
      success: false,
      message: "fill the all fields",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      data: null,
      success: false,
      message: "incorrect email or password",
    });
  }

  const isCorrectPass = bcrypt.compare(password,user.password);
  if (!isCorrectPass) {
    return res.json({
      data: null,
      success: false,
      message: "incorrect email or password",
    });
  }

  const { password: _, ...userWithoutPassword } = user._doc;

  genTokenAndSetCookie(user.id,res);

  res.status(200).json({
    data: userWithoutPassword,
    success: true,
    message: "User singIn sucssfully",
  });
};

// signOut router

export const signOut = async (req, res) => {
  res.clearCookie("token",{maxage:0});
  return res.status(200).json({
    data:null,
    success:true,
    message:"user Log out successfully"
  });
};
