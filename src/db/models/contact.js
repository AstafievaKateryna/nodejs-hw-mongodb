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
      required: true,
    },
    isFavourite: {
      type: Boolean,
      required: true,
      default: false,
    },
    contactType: {
      type: String,
      enum: contactsType,
      required: true,
      default: ["personal"],
    },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true, versionKey: false },
);

export const ContactsColection = model("contacts", ContactSchema);
