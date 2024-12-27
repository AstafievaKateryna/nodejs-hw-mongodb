import nodemailer from "nodemailer";

import { SMTP } from "../constants/constants.js";
import { env } from "../utils/env.js";
import createHttpError from "http-errors";
console.log(env(SMTP.SMTP_HOST));
const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  const email = await transporter.sendMail(options);
  if (email.rejected.length !== 0)
    throw createHttpError(
      500,
      "Failed to send the email, please try again later.",
    );
};
