import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";
import { createAccessToken, createRefreshToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { name, lastName, email, username, password, gender } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists." });
    }

    const newUser = new User({
      name,
      lastName,
      username,
      email,
      gender,
      password: passwordHash,
    });

    const userSaved = await newUser.save();

    res.json({
      message: "User Created Successfully",
      id: userSaved._id,
      name: userSaved.name,
      lastName: userSaved.lastName,
      username: userSaved.username,
      email: userSaved.email,
      gender: userSaved.gender,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res
        .status(400)
        .json({ message: "Usuario no encontrado, Porfavor Registrese" });
    const passwordCompare = await bcrypt.compare(password, userFound.password);

    if (!passwordCompare)
      return res.status(400).json({ message: "Invalid password" });

    const accessToken = await createAccessToken(
      {
        id: userFound._id,
      },
      TOKEN_SECRET
    );

    const refreshToken = await createRefreshToken(
      { id: userFound._id },
      TOKEN_SECRET
    );
    res.cookie("accessToken", accessToken, { secure: true, sameSite: "None" });
    res.cookie("refreshToken", refreshToken, {
      secure: true,
      sameSite: "None",
    });
    res.json({
      message: "User Login Successfully",
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
      name: userFound.name,
      lastName: userFound.lastName,
      gender: userFound.gender,
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
    const decodedToken = await jwt.verify(refreshToken, TOKEN_SECRET);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const accessToken = await createAccessToken({
      id: user._id,
    });
    const newRefreshToken = await createRefreshToken({
      id: user._id,
    });

    res.cookie("accessToken", accessToken, { sameSite: "None", secure: true });
    res.cookie("refreshToken", newRefreshToken, {
      sameSite: "None",
      secure: true,
    });

    res.json({ message: "Access token refreshed" });
  } catch (error) {
    res.status(403).json({
      message:
        "The refresh token is invalid or has expired. Please log in again.",
    });
  }
};

export const verifyToken = async (req, res) => {
  const { accessToken } = req.cookies;
  if (!accessToken)
    return res.status(401).json({ message: "No access token provided" });

  try {
    const user = await jwt.verify(accessToken, TOKEN_SECRET);
    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "User not found" });
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const profile = async (req, res) => {
  try {
    if (!req.user.id)
      return res.status(400).json({ message: "User ID not provided" });
    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({ message: "User not found" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      name: userFound.name,
      lastName: userFound.lastName,
      image: userFound.image,
      gender: userFound.gender,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
