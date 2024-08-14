const db = require("../db");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");

const renameAsync = promisify(fs.rename);
const dbGetAsync = promisify(db.get).bind(db);
const dbRunAsync = promisify(db.run).bind(db);

exports.getAllTeams = (req, res) => {
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
};

exports.getTeamById = (req, res) => {
  const teamId = req.params.id;

  db.get("SELECT * FROM teams WHERE id = ?", [teamId], (err, team) => {
    if (err) {
      res.status(500).send({ error: "Database error" });
      return;
    }

    if (!team) {
      res.status(404).send({ error: "Team not found" });
      return;
    }

    db.all(
      "SELECT * FROM members WHERE team_id = ?",
      [teamId],
      (err, members) => {
        if (err) {
          res.status(500).send({ error: "Database error" });
          return;
        }

        db.all(
          "SELECT * FROM matches WHERE team_id = ?",
          [teamId],
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
};

exports.getTeamByOwner = (req, res) => {
  const owner = req.params.owner;

  db.get("SELECT * FROM teams WHERE owner = ?", [owner], (err, team) => {
    if (err) {
      res.status(500).send({ error: "Database error" });
      return;
    }

    if (!team) {
      res.status(404).send({ error: "Team not found" });
      return;
    }

    db.all(
      "SELECT * FROM members WHERE team_id = ?",
      [team.id],
      (err, members) => {
        if (err) {
          res.status(500).send({ error: "Database error" });
          return;
        }

        db.all(
          "SELECT * FROM matches WHERE team_id = ?",
          [team.id],
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
};

exports.createTeam = (req, res) => {
  const { owner, name, totalGames } = req.body;
  const members = getMembers(req.body);

  const id = uuidv4();
  const imgId = uuidv4();

  let imagePath = null;

  if (req.file) {
    const tempPath = req.file.path;
    const targetPath = path.join(
      __dirname,
      "..",
      "uploads",
      `${imgId + req.file.originalname}`
    );

    fs.rename(tempPath, targetPath, (err) => {
      if (err) return res.status(500).send({ error: "Image upload error" });
    });

    imagePath = `/uploads/${imgId}${req.file.originalname}`;
  }

  db.run(
    "INSERT INTO teams (id, owner, totalGames, name, image) VALUES (?, ?, ?, ?, ?)",
    [id, owner, totalGames, name, imagePath],
    (err) => {
      if (err) {
        res.status(500).send({ error: "Database error" });
        return;
      }

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
        .catch(() => {
          res.status(500).send({ error: "Database error" });
        });
    }
  );
};

exports.updateTeam = async (req, res) => {
  const id = req.params.id;
  const imgId = uuidv4();
  const { owner, totalGames, name } = req.body;

  console.log("req.body:", req.body);

  let imagePath = null;

  const members = getMembers(req.body);
  const matcInfo = getMatchHistory(req.body);

  console.log("matcInfo:", matcInfo);

  if (req.file) {
    try {
      const tempPath = req.file.path;
      const targetPath = path.join(
        __dirname,
        "..",
        "uploads",
        `${imgId + req.file.originalname}`
      );
      await renameAsync(tempPath, targetPath);
      imagePath = `/uploads/${imgId}${req.file.originalname}`;
    } catch (err) {
      return res.status(500).send({ error: "Image upload error" });
    }
  }

  try {
    const team = await dbGetAsync("SELECT * FROM teams WHERE id = ?", [id]);
    if (!team) {
      return res.status(404).send({ error: "Team not found" });
    }
    const updatedOwner = owner || team.owner;
    const updatedTotalGames =
      totalGames !== undefined ? totalGames : team.totalGames;
    const updatedName = name || team.name;
    const updatedImage = imagePath || team.image;
    await dbRunAsync(
      "UPDATE teams SET owner = ?, totalGames = ?, name = ?, image = ? WHERE id = ?",
      [updatedOwner, updatedTotalGames, updatedName, updatedImage, id]
    );

    if (members) {
      await dbRunAsync("DELETE FROM members WHERE team_id = ?", [id]);
      for (const member of members) {
        await dbRunAsync(
          "INSERT INTO members (team_id, name, icon, totalScore) VALUES (?, ?, ?, ?)",
          [id, member.name, member.icon, member.totalScore]
        );
      }
    }

    if (matcInfo) {
      const matchId = uuidv4();
      await dbRunAsync(
        "INSERT INTO matches (id, date, team_id) VALUES (?, ?, ?)",
        [matchId, matcInfo.date, id]
      );

      const insertMatchResult = async (position, memberName) => {
        await dbRunAsync(
          "INSERT INTO match_results (match_id, position, member_name) VALUES (?, ?, ?)",
          [matchId, position, memberName]
        );
      };

      // Insert results for winner, second, third
      if (matcInfo.winner) await insertMatchResult(1, matcInfo.winner);
      if (matcInfo.second) await insertMatchResult(2, matcInfo.second);
      if (matcInfo.third) await insertMatchResult(3, matcInfo.third);

      for (let i = 0; i < matcInfo.participants.length; i++) {
        if (matcInfo.participants[i] === matcInfo.winner) continue;
        if (matcInfo.participants[i] === matcInfo.second) continue;
        if (matcInfo.participants[i] === matcInfo.third) continue;

        
        await insertMatchResult(4 + i, matcInfo.participants[i]);
      }
    }

    res.send({ message: "Team updated successfully" });
  } catch (err) {
    res.status(500).send({ error: "Database error" });
  }
};

const getMembers = (reqBody) => {
  const members = [];
  for (let i = 0; ; i++) {
    const memberName = reqBody[`members[${i}].name`];
    const icon = reqBody[`members[${i}].icon`];
    const totalScore = reqBody[`members[${i}].totalScore`];

    if (memberName === undefined) break;

    members.push({
      name: memberName,
      icon,
      totalScore: parseInt(totalScore, 10) || 0,
    });
  }
  return members.length > 0 ? members : null;
};

const getMatchHistory = (reqBody) => {
  const { date, winner, second, third, participants } = reqBody;
  if (date && winner && second && third && participants) {
    return {
      date,
      winner,
      second,
      third,
      participants,
    };
  } else {
    return null;
  }
};
