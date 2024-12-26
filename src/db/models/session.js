import { Schema, model } from "mongoose";

const SessionSchema = new Schema(
  {
    userId: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

export const Session = model("session", SessionSchema);
