const mysql = require('mysql2/promise');

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    console.log('Connection successful');
    await connection.end();
  } catch (err) {
    console.error('Connection failed:', err);
  }
})();
