import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
} from "../services/auth.js";
import createHttpError from "http-errors";
import { THIRTY_DAYS } from "../constants/constants.js";

export const registerUserController = async (req, res) => {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const registeredUser = await registerUser(payload);

  res.status(201).send({
    status: 201,
    message: "Successfully registered a user!",
    data: registeredUser,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.status(200).send({
    status: 200,
    message: "Successfully logged in an user!",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  if (!sessionId && !refreshToken)
    throw createHttpError(401, "Session not found");

  await logoutUser(sessionId, refreshToken);

  res.clearCookie("sessionId");
  res.clearCookie("refreshToken");

  res.status(204).end();
};

const setupSession = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.send({
    status: 200,
    message: "Successfully refreshed a session!",
    data: {
      accessToken: session.accessToken,
    },
  });
};
