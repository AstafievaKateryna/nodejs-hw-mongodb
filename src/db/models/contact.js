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
      required: true,
      default: false,
    },
    contactType: {
      type: String,
      enum: ["work", "home", "personal"],
      required: true,
      default: ["personal"],
    },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    photo: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

export const ContactsColection = model("contacts", ContactSchema);
