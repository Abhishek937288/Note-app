import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ data: null, success: false, meassage: "unauthorised" });
  }

  const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  
  req.user = decoded;
  next();
};
