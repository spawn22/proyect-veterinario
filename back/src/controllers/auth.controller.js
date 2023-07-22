import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";
import { createAccessToken, createRefreshToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { name, lastName, email, username, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      lastName,
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();

    const accessToken = await createAccessToken({ id: userSaved._id });
    const refreshToken = await createRefreshToken({ id: userSaved._id });

    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    res.json({
      message: "User Created Successfully",
      id: userSaved._id,
      name: userSaved.name,
      lastName: userSaved.lastName,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json({ message: "User not found" });
    const passwordCompare = await bcrypt.compare(password, userFound.password);

    if (!passwordCompare)
      return res.status(400).json({ message: "Invalid password" });

    const accessToken = await createAccessToken({ id: userFound._id });
    const refreshToken = await createRefreshToken({ id: userFound._id });
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    res.json({
      message: "User Login Successfully",
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
      name: userFound.name,
      lastName: userFound.lastName,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("token");
  res.json({ message: "Logout Successfully" });
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decodedToken = await verifyToken(refreshToken, TOKEN_SECRET);
    const accessToken = await createAccessToken({ id: decodedToken.id });
    const newRefreshToken = await createRefreshToken({ id: decodedToken.id });

    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const verifyToken = async (req, res) => {
  const { accessToken } = req.cookies;
  if (!accessToken) return res.send(false);

  jwt.verify(accessToken, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    name: userFound.name,
    lastName: userFound.lastName,
  });
};
