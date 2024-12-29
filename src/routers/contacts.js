import { Router } from "express";
import express from "express";
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  updateContactController,
} from "../controllers/contacts.js";

import {
  createContactSchema,
  updateContactSchema,
} from "../validation/contacts.js";

import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";

import { authenticate } from "../middlewares/authenticate.js";

const jsonParser = express.json();
const router = Router();

router.use(authenticate);
router.get("/", authenticate, ctrlWrapper(getContactsController));

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  "/",
  authenticate,
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(deleteContactController),
);

router.patch(
  "/:contactId",
  authenticate,
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

export default router;
