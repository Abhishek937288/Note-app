import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String, 
      required: true,
    },
    userName: {
      type: String,
      uniqe: true,
      required: true,
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel = model("User", userSchema);

export default userModel;
