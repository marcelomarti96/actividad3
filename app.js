const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Servir archivos estáticos desde la carpeta 'public'

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
}).on('error', (error) => {
  console.error('Error al iniciar el servidor:', error);
});

