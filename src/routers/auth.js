import { Router } from "express";
import express from "express";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUserSchema } from "../validation/auth.js";
import { registerUserController } from "../controllers/auth.js";
import { loginUserController } from "../controllers/auth.js";
import { logoutUserController } from "../controllers/auth.js";
import { refreshUserSessionController } from "../controllers/auth.js";

import { loginUserSchema } from "../validation/auth.js";
import { validateBody } from "../middlewares/validateBody.js";

const jsonParser = express.json();
const router = Router();

router.post(
  "/register",
  jsonParser,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  "/login",
  jsonParser,
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post("/refresh", ctrlWrapper(refreshUserSessionController));

router.post("/logout", ctrlWrapper(logoutUserController));
export default router;
