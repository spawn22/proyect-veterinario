import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";
export const authRequired = (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "No token, authorization denied  " });
  }
  jwt.verify(accessToken, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    req.user = user;

    next();
  });
};
