import { TOKEN_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}

export function createRefreshToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
