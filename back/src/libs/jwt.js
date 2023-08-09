// La función JWT 'createAccessToken' que firma un token temporal de sesión con una expiración de 1 hora y el Payload del usuario.
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    //	sign() Crea una nueva firma JWT, con el 'payload' y su caducidad 'expiresIn', utilizando el Token Secret almacenado en la variable global 'TOKEN_SECRET'.
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) reject(err);
        // Si el token se genera correctamente, se envía un token en la respuesta.
        resolve(token);
      }
    );
  });
}

// La función JWT 'createRefreshToken' que firma un token de actualización con una expiración de un día y el Payload del usuario.
export function createRefreshToken(payload) {
  return new Promise((resolve, reject) => {
    //	sign() Crea una nueva firma JWT, con el 'payload' y su caducidad 'expiresIn', utilizando el Token Secret almacenado en la variable global 'TOKEN_SECRET'.
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        // Si el token se genera correctamente, se envía un token en la respuesta.
        resolve(token);
      }
    );
  });
}
