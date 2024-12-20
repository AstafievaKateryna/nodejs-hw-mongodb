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
    contactType: {
      type: String,
      enum: ["work", "home", "personal"],
      required: true,
      default: ["personal"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    createdAt: Date.now,
    updatedAt: Date.now,
  },
);

export const ContactsCollection = mongoose.model("contacts", ContactSchema);
