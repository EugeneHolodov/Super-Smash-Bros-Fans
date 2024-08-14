const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");
const app = express();
require("dotenv").config();

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//insertFighters();

app.get("/api/fighters", (req, res) => {
  db.all("SELECT * FROM fighters", [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: "Database error" });
      return;
    }

    const formattedFighters = rows.map((fighter) => ({
      description: fighter.description,
      youtube: fighter.youtube,
      name: fighter.name,
      order: fighter.order,
      images: {
        icon: fighter.icon,
        portrait: fighter.portrait,
      },
      series: {
        icon: fighter.series_icon,
        name: fighter.series_name,
      },
    }));

    res.send(formattedFighters);
  });
});

// Создание папки для загрузок, если её нет
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.get("/api/fighter", (req, res) => {
  const name = req.query.name.replace(/\s+/g, "").toLowerCase();
  db.get(
    'SELECT * FROM fighters WHERE LOWER(REPLACE(name, " ", "")) = ?',
    [name],
    (err, row) => {
      if (err) {
        res.status(500).send({ error: "Database error" });
        return;
      }
      if (row) {
        const formattedFighter = {
          description: row.description,
          youtube: row.youtube,
          name: row.name,
          order: row.order,
          images: {
            icon: row.icon,
            portrait: row.portrait,
          },
          series: {
            icon: row.series_icon,
            name: row.series_name,
          },
        };
        res.send(formattedFighter);
      } else {
        res.status(404).send({ error: "Fighter not found" });
      }
    }
  );
});

// Получение всех команд
app.get("/api/teams", (req, res) => {
  db.all("SELECT * FROM teams", [], (err, teams) => {
    if (err) {
      res.status(500).send({ error: "Database error" });
      return;
    }

    const teamIds = teams.map((team) => team.id);
    db.all(
      `SELECT * FROM members WHERE team_id IN (${teamIds
        .map(() => "?")
        .join(",")})`,
      teamIds,
      (err, members) => {
        if (err) {
          res.status(500).send({ error: "Database error" });
          return;
        }

        db.all(
          `SELECT * FROM matches WHERE team_id IN (${teamIds
            .map(() => "?")
            .join(",")})`,
          teamIds,
          (err, matches) => {
            if (err) {
              res.status(500).send({ error: "Database error" });
              return;
            }

            db.all("SELECT * FROM match_results", [], (err, results) => {
              if (err) {
                res.status(500).send({ error: "Database error" });
                return;
              }

              const formattedTeams = teams.map((team) => {
                const teamMembers = members.filter(
                  (member) => member.team_id === team.id
                );
                const teamMatches = matches
                  .filter((match) => match.team_id === team.id)
                  .map((match) => {
                    const matchResults = results.filter(
                      (result) => result.match_id === match.id
                    );
                    return {
                      ...match,
                      winner: matchResults.find(
                        (result) => result.position === 1
                      ),
                      second: matchResults.find(
                        (result) => result.position === 2
                      ),
                      third: matchResults.find(
                        (result) => result.position === 3
                      ),
                      another: matchResults.filter(
                        (result) => result.position > 3
                      ),
                      participants: matchResults,
                    };
                  });
                const baseUrl = process.env.BASE_URL || `http://localhost:8081`;
                return {
                  ...team,
                  image: team.image ? `${baseUrl}${team.image}` : null,
                  members: teamMembers,
                  matchesHistory: teamMatches,
                };
              });

              res.send(formattedTeams);
            });
          }
        );
      }
    );
  });
});

// Получение одной команды по ID
app.get("/api/teams/:id", (req, res) => {
  const teamId = req.params.id;

  // Получение основной информации о команде
  db.get("SELECT * FROM teams WHERE id = ?", [teamId], (err, team) => {
    if (err) {
      res.status(500).send({ error: "Database error" });
      return;
    }

    if (!team) {
      res.status(404).send({ error: "Team not found" });
      return;
    }

    // Получение участников команды
    db.all(
      "SELECT * FROM members WHERE team_id = ?",
      [teamId],
      (err, members) => {
        if (err) {
          res.status(500).send({ error: "Database error" });
          return;
        }

        // Получение матчей команды
        db.all(
          "SELECT * FROM matches WHERE team_id = ?",
          [teamId],
          (err, matches) => {
            if (err) {
              res.status(500).send({ error: "Database error" });
              return;
            }

            // Получение результатов матчей
            db.all("SELECT * FROM match_results", [], (err, results) => {
              if (err) {
                res.status(500).send({ error: "Database error" });
                return;
              }

              const teamMatches = matches.map((match) => {
                const matchResults = results.filter(
                  (result) => result.match_id === match.id
                );
                return {
                  ...match,
                  winner: matchResults.find((result) => result.position === 1),
                  second: matchResults.find((result) => result.position === 2),
                  third: matchResults.find((result) => result.position === 3),
                  another: matchResults.filter((result) => result.position > 3),
                  participants: matchResults,
                };
              });

              const baseUrl = process.env.BASE_URL || `http://localhost:8081`;

              // Форматирование ответа
              const formattedTeam = {
                ...team,
                image: team.image ? `${baseUrl}${team.image}` : null,
                members: members,
                matchesHistory: teamMatches,
              };

              res.send(formattedTeam);
            });
          }
        );
      }
    );
  });
});

app.post("/api/teams", upload.single("image"), (req, res) => {
  const { owner, name, totalGames, matchesHistory } = req.body;
  const members = []; // Создаем пустой массив для участников

  // Извлечение участников из req.body
  for (let i = 0; ; i++) {
    const name = req.body[`members[${i}].name`];
    const icon = req.body[`members[${i}].icon`];
    const totalScore = req.body[`members[${i}].totalScore`];

    if (name === undefined) break; // Прерываем цикл, если данных больше нет

    members.push({ name, icon, totalScore: parseInt(totalScore, 10) || 0 });
  }

  const id = uuidv4();
  let imagePath = null;

  // Обработка загрузки изображения
  if (req.file) {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "uploads", req.file.originalname);

    fs.rename(tempPath, targetPath, (err) => {
      if (err) return res.status(500).send({ error: "Image upload error" });
    });

    imagePath = `/uploads/${req.file.originalname}`;
  }

  // Вставка команды в базу данных
  db.run(
    "INSERT INTO teams (id, owner, totalGames, name, image) VALUES (?, ?, ?, ?, ?)",
    [id, owner, totalGames, name, imagePath],
    (err) => {
      if (err) {
        res.status(500).send({ error: "Database error" });
        return;
      }

      // Вставка участников в базу данных
      const memberInserts = members.map((member) => {
        return new Promise((resolve, reject) => {
          db.run(
            "INSERT INTO members (team_id, name, icon, totalScore) VALUES (?, ?, ?, ?)",
            [id, member.name, member.icon, member.totalScore],
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            }
          );
        });
      });

      Promise.all(memberInserts)
        .then(() => {
          res
            .status(201)
            .send({ message: "Team and members created successfully" });
        })
        .catch((err) => {
          res.status(500).send({ error: "Database error" });
        });
    }
  );
});

// Изменение существующей команды
app.put("/api/teams/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { owner, totalGames, name, members, matchesHistory } = req.body;
  let imagePath = null;

  // Handling image upload
  if (req.file) {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "uploads", req.file.originalname);

    fs.rename(tempPath, targetPath, (err) => {
      if (err) return res.status(500).send({ error: "Image upload error" });
    });

    imagePath = `/uploads/${req.file.originalname}`;
  }

  // Update team details, keeping existing values for fields not provided
  db.serialize(() => {
    // Retrieve current team details
    db.get("SELECT * FROM teams WHERE id = ?", [id], (err, team) => {
      if (err) {
        res.status(500).send({ error: "Database error" });
        return;
      }

      if (!team) {
        res.status(404).send({ error: "Team not found" });
        return;
      }

      // Prepare updated values
      const updatedOwner = owner || team.owner;
      const updatedTotalGames =
        totalGames !== undefined ? totalGames : team.totalGames;
      const updatedName = name || team.name;
      const updatedImage = imagePath || team.image;

      // Update team record
      db.run(
        "UPDATE teams SET owner = ?, totalGames = ?, name = ?, image = ? WHERE id = ?",
        [updatedOwner, updatedTotalGames, updatedName, updatedImage, id],
        (err) => {
          if (err) {
            res.status(500).send({ error: "Database error" });
            return;
          }

          // Update members if provided
          if (members) {
            // Delete existing members
            db.run("DELETE FROM members WHERE team_id = ?", [id], (err) => {
              if (err) {
                res.status(500).send({ error: "Database error" });
                return;
              }

              // Insert new members
              members.forEach((member) => {
                db.run(
                  "INSERT INTO members (team_id, name, icon, totalScore) VALUES (?, ?, ?, ?)",
                  [id, member.name, member.icon, member.totalScore],
                  (err) => {
                    if (err) {
                      res.status(500).send({ error: "Database error" });
                    }
                  }
                );
              });
            });
          }

          // Update matchesHistory if provided
          if (matchesHistory) {
            // Delete existing matches and match results
            db.run("DELETE FROM matches WHERE team_id = ?", [id], (err) => {
              if (err) {
                res.status(500).send({ error: "Database error" });
                return;
              }

              // Insert new matches and match results
              matchesHistory.forEach((match) => {
                db.run(
                  "INSERT INTO matches (id, date, team_id) VALUES (?, ?, ?)",
                  [match.id, match.date, id],
                  (err) => {
                    if (err) {
                      res.status(500).send({ error: "Database error" });
                      return;
                    }

                    // Insert match results
                    const insertMatchResult = (position, member) => {
                      db.run(
                        "INSERT INTO match_results (match_id, position, member_name, member_icon, member_score) VALUES (?, ?, ?, ?, ?)",
                        [
                          match.id,
                          position,
                          member.name,
                          member.icon,
                          member.totalScore,
                        ],
                        (err) => {
                          if (err) {
                            res.status(500).send({ error: "Database error" });
                          }
                        }
                      );
                    };

                    insertMatchResult(1, match.winner);
                    insertMatchResult(2, match.second);
                    insertMatchResult(3, match.third);

                    match.another.forEach((member, index) => {
                      insertMatchResult(4 + index, member);
                    });

                    match.participants.forEach((member, index) => {
                      insertMatchResult(
                        4 + match.another.length + index,
                        member
                      );
                    });
                  }
                );
              });
            });
          }

          res.send({ message: "Team updated successfully" });
        }
      );
    });
  });
});

app.listen(8081, () => console.log("API Server listening on port 8081!"));
