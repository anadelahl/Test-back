const path = require("path");
const fs = require("fs"); // Asegúrate de importar el módulo fs
const ejecutarQuery = require("../../config/data-base.config");

const postCrearUsuario = async (usuario = {}) => {
    const { nombre, genero, image, fechaNacimiento, pais } = usuario;
    const estado = true;
    const query = `INSERT INTO usuario (nombre, genero, perfil, estado, fecha_nacimiento, pais) VALUES (?, ?, ?, ?, ?, ?)`;
    const valores = [nombre, genero, image, estado, fechaNacimiento, pais];
    const resultado = await ejecutarQuery(query, valores);
    return resultado;
};

const putActualizarUsuario = async (id, usuario = {}) => {
    const { nombre, genero, fecha_nacimiento, pais } = usuario;
    let fechaConvertida = new Date(fecha_nacimiento).toISOString().slice(0, 10);
    console.log(fecha_nacimiento);
    const query = `UPDATE usuario SET nombre = ?, genero = ?, fecha_nacimiento = ?, pais = ? WHERE id = ?`;
    const valores = [nombre, genero, fechaConvertida, pais, id];
    const resultado = await ejecutarQuery(query, valores);
    return resultado;
}

const deleteEliminarUsuario = async (id, image) => {
    try {
        // Construir la ruta completa de la imagen
        const imagePath = path.join(__dirname, '../../public/img', image);
        console.log('Ruta de la imagen:', imagePath);

        // Verificar si la imagen existe y eliminarla
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log('Imagen eliminada:', imagePath);
        } else {
            console.log('Imagen no encontrada:', imagePath);
        }

        // Eliminar el registro de la base de datos
        const query = `DELETE FROM usuario WHERE id = ?`;
        const valores = [id];
        const resultado = await ejecutarQuery(query, valores);

        return resultado;
    } catch (error) {
        console.error('Error al eliminar el usuario o la imagen:', error);
        throw error;
    }
}

const getTodosLosUsuarios = async () => {
    const query = `SELECT * FROM usuario`;
    const resultado = await ejecutarQuery(query);
    return resultado;
}

module.exports = { postCrearUsuario, getTodosLosUsuarios, putActualizarUsuario, deleteEliminarUsuario };
