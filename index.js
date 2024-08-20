const express = require("express");
const cors = require("cors");
const corsOptions = {
    origin: 'https://prueba-tecnica-fenix.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static('./public'));

const rutaPrincipal = express.Router();
const rutaUsuario = require("./src/router/usuario.router");

app.get("/", function (req, res, next) {
    res.send("Hola mundo!");
});

rutaPrincipal.use(rutaUsuario.indice, rutaUsuario.ruta);

app.use("/api", rutaPrincipal);

app.listen(9001, () => {
    console.log('Servidor corriendo en el puerto 9001');
});