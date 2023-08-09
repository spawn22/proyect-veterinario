import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";
// Función middleware que verifica la validez de un token de acceso y si es valida asigna los detalles del usuario de `req.user` antes de tomar la siguiente acción (`next`).
export const authRequired = (req, res, next) => {
  // Extrae el token de acceso de las cookies de la solicitud.
  const { accessToken } = req.cookies;
  if (!accessToken) {
    // Si no hay un token, envía una respuesta con el estado 401 (Unauthorized) y un mensaje de error que indica que no se proporcionó un token.
    return res
      .status(401)
      .json({ message: "No token, authorization denied  " });
  }
  // Verifica la validez del token de acceso utilizando el 'TOKEN_SECRET' almacenado en la variable global.
  jwt.verify(accessToken, TOKEN_SECRET, (err, user) => {
    if (err)
      // Si el token es inválido o ha caducado, envía una respuesta con el estado 401 (Unauthorized) y un mensaje de error que indica que el token no es válido.
      return res.status(401).json({ message: "Invalid token" });

    // Si el token de acceso es válido, actualiza el objeto `req.user` con los detalles del usuario autenticado correspondiente.
    req.user = user;

    // llama al siguiente middleware en la serie.
    next();
  });
};
