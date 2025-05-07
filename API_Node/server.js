const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 4000;
app.use(express.static('public'));


// Middleware para parsear el body de las solicitudes
app.use(bodyParser.json());

// Simulación de base de datos (en memoria)
let usuarios = [];

// Ruta de registro
app.post('/registro', async (req, res) => {
  const { usuario, contrasena } = req.body;

  // Validación de campos requeridos
  if (!usuario || !contrasena) {
    return res.status(400).json({ mensaje: 'Usuario y contraseña son requeridos' });
  }

  // Verificar si el usuario ya existe
  const usuarioExistente = usuarios.find(u => u.usuario === usuario);
  if (usuarioExistente) {
    return res.status(400).json({ mensaje: 'El usuario ya existe' });
  }

  // Encriptar la contraseña
  const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

  // Guardar el usuario
  usuarios.push({ usuario, contrasena: contrasenaEncriptada });
  res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
});

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  // Validación de campos requeridos
  if (!usuario || !contrasena) {
    return res.status(400).json({ mensaje: 'Usuario y contraseña son requeridos' });
  }

  // Buscar el usuario
  const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);
  if (!usuarioEncontrado) {
    return res.status(401).json({ mensaje: 'Autenticación fallida: Usuario no encontrado' });
  }

  // Comparar la contraseña
  const esCorrecta = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);
  if (!esCorrecta) {
    return res.status(401).json({ mensaje: 'Autenticación fallida: Contraseña incorrecta' });
  }

  res.status(200).json({ mensaje: 'Autenticación satisfactoria' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
