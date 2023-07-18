import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";

export const Register = async (req, res) => {
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

    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
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

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json({ message: "User not found" });
    const passwordCompare = await bcrypt.compare(password, userFound.password);

    if (!passwordCompare)
      return res.status(400).json({ message: "Invalid password" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      message: "User Login Successfully",
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
      name: userFound.name,
      lastName: userFound.lastName,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const Logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.json({ message: "Logout Successfully" });
};

export const Profile = async (req, res) => {
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
