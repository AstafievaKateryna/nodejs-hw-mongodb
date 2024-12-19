import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      enum: ["work", "home", "personal"],
      default: "personal",
    },
    email: {
      type: String,
      reqired: true,
    },
    isFavourite: {
      type: String,
      enum: ["work", "home", "personal"],
      required: true,
      default: "personal",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsColection = mongoose.model("contacts", ContactSchema);
