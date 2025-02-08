const pool = require('./pool');

async function getMessageList() {
  return (await pool.query('SELECT * FROM messages')).rows;
}

async function addMessage(author, text) {
  return await pool.query(
    'INSERT INTO messages (author, text) VALUES ($1, $2)',
    [author, text]
  );
}

async function getMessageDetails(id) {
  return (await pool.query('SELECT * FROM messages WHERE id = $1;', [id])).rows;
}

const db = {
  getMessageList,
  addMessage,
  getMessageDetails,
};

module.exports = db;
