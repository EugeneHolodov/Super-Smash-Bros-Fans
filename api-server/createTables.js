const db = require("./db");

db.serialize(() => {
  // Создание таблицы teams
  db.run(`CREATE TABLE IF NOT EXISTS teams (
    id TEXT PRIMARY KEY,
    owner TEXT,
    totalGames INTEGER,
    name TEXT,
    image TEXT
  )`);

  // Создание таблицы members
  db.run(`CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    icon TEXT,
    totalScore INTEGER,
    team_id TEXT,
    FOREIGN KEY(team_id) REFERENCES teams(id)
  )`);

  // Создание таблицы matches
  db.run(`CREATE TABLE IF NOT EXISTS matches (
    id TEXT PRIMARY KEY,
    date TEXT,
    team_id TEXT,
    FOREIGN KEY(team_id) REFERENCES teams(id)
  )`);

  // Создание таблицы match_results
  db.run(`CREATE TABLE IF NOT EXISTS match_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    match_id TEXT,
    position INTEGER,
    member_name TEXT,
    member_icon TEXT,
    member_score INTEGER,
    FOREIGN KEY(match_id) REFERENCES matches(id)
  )`);

  console.log("Tables created successfully");
});
