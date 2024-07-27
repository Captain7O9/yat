const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');

let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to database', dbPath);
  }
});

export default db;
