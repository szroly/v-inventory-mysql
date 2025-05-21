const mysql2 = require('mysql2/promise');
require('dotenv').config();

// Connection pool létrehozása
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306, 
  waitForConnections: true,
  connectionLimit: 10, // Maximum 10 egyidejű kapcsolat
  queueLimit: 0, // Nincs limit a várakozó kapcsolatokra
  connectTimeout: 10000, // 10 másodperces timeout
});

// Adatbázis kapcsolat tesztelése
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Sikeresen csatlakoztál az adatbázishoz!');
    connection.release(); // Kapcsolat visszaadása a pool-nak
  } catch (error) {
    console.error('Nem sikerült csatlakozni az adatbázishoz:', error.message);
  }
})();

module.exports = pool;