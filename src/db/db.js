const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./royalty.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS authors (
      id INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT,
      bank_account TEXT,
      ifsc TEXT
    )`);

  db.run(`CREATE TABLE IF NOT EXIST books (
      id INTEGER PRIMARY KEY,
      title TEXT,
      author_id INTEGER,
      royalty INTEGER
    )`);

  db.run(`CREATE TABLE IF NOT EXIST sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book_id INTEGER,
      quantity INTEGER,
      sale_date TEXT
    )`);

  db.run(`CREATE TABLE IF NOT EXIST withdrawals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author_id INTEGER,
      amount INTEGER,
      status TEXT,
      created_at TEXT
    )`);
});

module.exports = db;
