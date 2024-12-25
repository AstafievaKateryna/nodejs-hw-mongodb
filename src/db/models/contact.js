import { Schema, model } from "mongoose";

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      reqired: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ["work", "home", "personal"],
      default: "personal",
    },
  },
  { timestamps: true, versionKey: false },
);

export const ContactsColection = model("contacts", ContactSchema);
