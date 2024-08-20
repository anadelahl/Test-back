const ruta = require("express").Router();
const {
    postCrearUsuario,
    getTodosLosUsuarios,
    putActualizarUsuario,
    deleteEliminarUsuario,
} = require("../controller/usuario.controller");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) { //asignandole el destino a la imagen
        cb(null, "public/img");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

//ruta para acceder a todos los metodos
ruta.post("/crear-usuario",
    upload.single("image"),
    (req, res) => {
        const { nombre, genero, pais } = req.body;
        const fechaNacimiento = new Date(req.body.fecha_nacimiento);
        const image = req.file.filename;
        const usuario = {
            nombre,
            genero,
            image,
            fechaNacimiento,
            pais,
        };
        postCrearUsuario(usuario)
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                res.json(error);
            });
    }
);

ruta.get("/todos-los-usuarios",
    (req, res) => {
        getTodosLosUsuarios()
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                res.json(error);
            });
    }
);

ruta.put("/actualizar-usuario",
    (req, res) => {
        const { id, nombre, genero, fecha_nacimiento, pais } = req.body;
        const usuario = {
            nombre,
            genero,
            fecha_nacimiento,
            pais,
        };
        putActualizarUsuario(id, usuario)
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                res.json(error);
            });
    }
);

ruta.delete("/borrar-usuario",
    (req, res) => {
        const { id, perfil } = req.body;
        deleteEliminarUsuario(id, perfil)
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                res.json(error);
            });
    }
);

module.exports = {
    indice: "/usuario",
    ruta,
}