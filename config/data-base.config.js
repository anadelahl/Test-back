const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'defaultdb.c7u0ykmu6ih1.us-east-2.rds.amazonaws.com',
  user: 'admin',
  database: 'defaultdb',
  password: 'dminpassEasy1*',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: 3306,
});

async function ejecutarQuery(query = '', valores = []) {
  try {
    // Obtener una conexión del pool
    const [resultados] = await pool.query(query, valores);
    return resultados;
  } catch (error) {
    console.error('Hubo un error al ejecutar el query', error);
    throw error;
  }
}

module.exports = ejecutarQuery; //Exportar modulos
