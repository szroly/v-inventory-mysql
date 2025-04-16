const cron = require('node-cron');
const db = require('./db');

const cleanExpiredTokens = async () => {
  cron.schedule('0 3 * * 1', async () => {
    try {
      const connection = await db;
      const [result] = await connection.query('DELETE FROM tokens WHERE expiry_date < NOW()');
      console.log(`Expired tokens cleaned: ${result.affectedRows}`);
    } catch (error) {
      console.error('Error cleaning expired tokens:', error);
    }
  });
}

module.exports = cleanExpiredTokens;