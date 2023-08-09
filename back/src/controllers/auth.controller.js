// Importar el modelo `User` y las dependencias necesarias para la autenticación
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";
import { createAccessToken, createRefreshToken } from "../libs/jwt.js";

// Función de controlador para registrar un nuevo usuario en la base de datos.
export const register = async (req, res) => {
  // Extrayendo los detalles del nuevo usuario del objeto `req.body`.
  const { name, lastName, email, username, password, gender } = req.body;

  try {
    // Cifrar la contraseña proporcionada utilizando 'bcrypt.hash()'.
    const passwordHash = await bcrypt.hash(password, 10);

    // Verificar si ya existe un usuario en la base de datos con la misma dirección de correo electrónico o nombre de usuario.
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      // Si el usuario ya existe, envía una respuesta con el estado 400 (Bad Request) y un mensaje que indica que un usuario con esta dirección de correo electrónico o nombre de usuario ya existe.
      return res
        .status(400)
        .json({ message: "User with this email or username already exists." });
    }

    // Si el usuario aún no existe, crea un nuevo objeto `User` con los detalles proporcionados y la contraseña cifrada.
    const newUser = new User({
      name,
      lastName,
      username,
      email,
      gender,
      password: passwordHash,
    });

    // Guardando el nuevo objeto de usuario en la base de datos
    const userSaved = await newUser.save();

    // Envía una respuesta con el estado 200 (OK) y un mensaje de éxito que indica que el usuario se ha creado correctamente.
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
    // Envía una respuesta con el estado 500 (Internal Server Error) y los detalles del error en la carga útil como un objeto de JSON.
    res.status(500).json({ message: error.message });
  }
};

// Función de controlador para verificar y autenticar la identidad de un usuario.
export const login = async (req, res) => {
  // Extrae los detalles de inicio de sesión del objeto `req.body`.
  const { email, password } = req.body;
  try {
    // Busca un usuario en la base de datos que coincida con la dirección de correo electrónico proporcionada.
    const userFound = await User.findOne({ email });

    if (!userFound)
      // Si el usuario no se encuentra, envía una respuesta con el estado 400 (Petición incorrecta) y un mensaje de error que indica que el correo electrónico suministrado No se encontró el usuario en nuestra base de datos.
      return res
        .status(400)
        .json({ message: "Usuario no encontrado, Porfavor Registrese" });

    // Compara la contraseña del objeto encontrado con la contraseña proporcionada usando el método `bcrypt.compare()`.
    const passwordCompare = await bcrypt.compare(password, userFound.password);

    // Si el hash de la contraseña retrno 'false' (no coincide) envía una respuesta con el estado 400 (Bad Request) y un mensaje de error que indica que la contraseña proporcionada es inválida.
    if (!passwordCompare)
      return res.status(400).json({ message: "Invalid password" });

    // Si los detalles son válidos, generamos unaccessToken y un refreshToken utilizando los objetos 'createAccessToken' y 'createRefreshToken' definidos en `../libs/jwt.js`.
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
    // Agregamos el token a las cookies de la respuesta.
    res.cookie("accessToken", accessToken, { secure: true, sameSite: "None" });
    res.cookie("refreshToken", refreshToken, {
      secure: true,
      sameSite: "None",
    });
    // Envía una respuesta con el estado 200 (OK) y los detalles del usuario encontrado.
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
    // Envía una respuesta con el estado 500 (Internal Server Error) y los detalles del error en la carga útil como un objeto de JSON.
    res.status(500).json({ message: error.message });
  }
};

// Función de controlador para eliminar los tokens de autenticación de las cookies del cliente
export const logout = async (req, res) => {
  // Elimina los tokens de las cookies de la respuesta.
  res.clearCookie("accessToken", { sameSite: "none", secure: true });
  res.clearCookie("refreshToken", { sameSite: "none", secure: true });
  res.clearCookie("token", { sameSite: "none", secure: true });
  // Envía una respuesta de éxito indicando que se ha finalizado la sesión.
  res.json({ message: "Logout Successfully" });
};
// Función de controlador para generar un nuevo token de acceso utilizando el token de actualización.
export const refreshToken = async (req, res) => {
  // Extrae el token de actualización de las cookies de la solicitud.
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    // Si el token de actualización no se encuentra en las cookies de la solicitud, se envía una respuesta con el estado 401 (Unauthorized) y un mensaje de error que indica que no se proporcionó el token de actualización.
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    // Decodifica el token de actualización usando el Token Secret y utiliza la identificación del usuario para generar un nuevo token de acceso y actualiza el token de actualización.
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

    // Actualiza las cookies de la respuesta con el nuevo token de acceso y token de actualización.
    res.cookie("accessToken", accessToken, { sameSite: "None", secure: true });
    res.cookie("refreshToken", newRefreshToken, {
      sameSite: "None",
      secure: true,
    });

    // Envía una respuesta con estado 200 (OK) y un mensaje de éxito indicando que se ha generado un nuevo token de acceso.
    res.json({ message: "Access token refreshed" });
  } catch (error) {
    // Si ocurre un error durante la actualización de los tokens, se envía una respuesta con estado 403 (Forbidden) y un mensaje de error que indica que el token de actualización no es válido o ha expirado.
    res.status(403).json({
      message:
        "The refresh token is invalid or has expired. Please log in again.",
    });
  }
};

// Función de controlador que verifica la validez del token de acceso y devuelve detalles del usuario correspondiente.
export const verifyToken = async (req, res) => {
  // Extrae el token de acceso de las cookies de la solicitud y verifica su validez utilizando el Token Secret.
  const { accessToken } = req.cookies;
  if (!accessToken)
    return res.status(401).json({ message: "No access token provided" });

  try {
    // Verifica la validez del token de acceso y busca el usuario correspondiente según el ID de usuario almacenado en el token.
    const user = await jwt.verify(accessToken, TOKEN_SECRET);
    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "User not found" });

    // Si el token de acceso es válido y el usuario correspondiente se encuentra en la base de datos, envía una respuesta con estado 200 (OK) y los detalles del usuario.
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    // Si el token de acceso no es válido e ha expirado, se envía una respuesta con el estado 401 (Unauthorized) y un mensaje de error que indica que el token no es válido.
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Función de controlador para obtener detalles de perfil de usuario.
export const profile = async (req, res) => {
  try {
    // Verifica que se haya proporcionado un ID de usuario y busca el usuario correspondiente en la base de datos.
    if (!req.user.id)
      return res.status(400).json({ message: "User ID not provided" });
    const userFound = await User.findById(req.user.id);

    // Si el usuario correspondiente no se encuentra en la base de datos envía una respuesta con el estado 400 (Bad Request) y un mensaje de error que indica que el usuario no se ha encontrado.
    if (!userFound) return res.status(400).json({ message: "User not found" });

    // Si el usuario se ha encontrado correctamente, envía una respuesta con estado 200 (OK) y los detalles de perfil del usuario.
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
    // Si ocurre un error durante el proceso de búsqueda del usuario correspondiente en la base de datos, envía una respuesta con el estado 500 (Internal Server Error) y los detalles del error en un mensaje de error.
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
