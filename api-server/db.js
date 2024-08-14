const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Путь к базе данных
const dbPath = path.resolve(__dirname, 'smashdb.db');

// Открываем базу данных. Если файла базы данных нет, он будет создан
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to database');
  }
});

// Создаем таблицу, если её нет
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS fighters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    icon TEXT,
    portrait TEXT,
    youtube TEXT,
    series_icon TEXT,
    series_name TEXT,
    "order" TEXT
  )`, (err) => {
    if (err) {
      console.error('Could not create table', err);
    } else {
      console.log('Table created or already exists');
    }
  });
});

module.exports = db;
