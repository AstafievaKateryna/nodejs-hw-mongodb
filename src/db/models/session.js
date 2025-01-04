import { Schema, model } from "mongoose";

const SessionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Session = model("session", SessionSchema);
