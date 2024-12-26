import { Schema, model } from "mongoose";
import { ROLES } from "../../constants/constants.js";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [ROLES.USER],
      default: ROLES.USER,
    },
  },
  { timestamps: true, versionKey: false },
);

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model("users", UserSchema);
