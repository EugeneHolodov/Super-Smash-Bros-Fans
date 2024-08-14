const db = require("./db");

db.serialize(() => {
  db.run(`DELETE FROM match_results`, (err) => {
    if (err) {
      console.error("Error clearing table", err);
    } else {
      console.log("Table cleared successfully");
    }
  });

  // Опционально, если хотите сбросить ID автоинкремента
  db.run(`DELETE FROM sqlite_sequence WHERE name='match_results'`, (err) => {
    if (err) {
      console.error("Error resetting auto-increment ID", err);
    } else {
      console.log("Auto-increment ID reset successfully");
    }
  });
});
