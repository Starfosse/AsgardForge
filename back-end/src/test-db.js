const mysql = require('mysql2/promise');

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'starfosse',
      password: '4589',
      database: 'asgardforge',
    });
    console.log('Connection successful');
    await connection.end();
  } catch (err) {
    console.error('Connection failed:', err);
  }
})();
