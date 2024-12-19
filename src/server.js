import express from "express";
import pinoHttp from "pino-http";
import pino from "pino";
import cors from "cors";

import { getAllContcats, getContactById } from "./services/contacts.js";
const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    transport: { target: "pino-pretty" },
  });

  app.use(cors());
  app.use(pinoHttp({ logger }));

  app.get("/contacts", async (req, res) => {
    const contacts = await getAllContcats();
    ({ status: 500, message: "Internal server error" });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};
