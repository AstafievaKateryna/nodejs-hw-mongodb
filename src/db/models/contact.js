import mongoose from 'mongoose';

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
      required: true,
    },
       isFavourite: {
        type: Boolean,
        required: false,
        default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const ContactsColection = mongoose.model('contacts', ContactSchema);
