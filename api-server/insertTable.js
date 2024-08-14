const db = require("./db");
const fs = require("fs");
const path = require("path");

const teams = [
  {
    id: "EF7EF8WF668FWE9",
    owner: "Samir",
    totalGames: 3,
    name: "Crazy seagulls",
    image: "./assets/smash-bros.jpeg",
    members: [
      { name: "Samir", icon: "person-01.png", totalScore: 100 },
      { name: "Hanna", icon: "person-02.png", totalScore: 90 },
      { name: "Jhoe", icon: "person-03.png", totalScore: 90 },
      { name: "Ben", icon: "person-05.png", totalScore: 90 },
      { name: "Richard", icon: "person-06.png", totalScore: 90 },
      { name: "Rita", icon: "person-07.png", totalScore: 90 },
    ],
    matchesHistory: [
      {
        id: "1",
        date: "2024-07-25",
        winner: { name: "Rita", icon: "person-07.png", totalScore: 20 },
        second: { name: "Jhoe", icon: "person-03.png", totalScore: 10 },
        third: { name: "Samir", icon: "person-01.png", totalScore: 5 },
        another: [{ name: "Hanna", icon: "person-02.png", totalScore: 0 }],
        participants: [
          { name: "Rita", icon: "person-07.png", totalScore: 20 },
          { name: "Jhoe", icon: "person-03.png", totalScore: 10 },
          { name: "Samir", icon: "person-01.png", totalScore: 5 },
          { name: "Hanna", icon: "person-02.png", totalScore: 0 },
        ],
      },
      {
        id: "2",
        date: "2024-07-27",
        winner: { name: "Jhoe", icon: "person-03.png", totalScore: 30 },
        second: { name: "Ben", icon: "person-05.png", totalScore: 5 },
        third: { name: "Samir", icon: "person-01.png", totalScore: 10 },
        another: [
          { name: "Hanna", icon: "person-02.png", totalScore: 0 },
          { name: "Richard", icon: "person-06.png", totalScore: 0 },
          { name: "Rita", icon: "person-07.png", totalScore: 20 },
        ],
        participants: [
          { name: "Jhoe", icon: "person-03.png", totalScore: 30 },
          { name: "Ben", icon: "person-05.png", totalScore: 5 },
          { name: "Samir", icon: "person-01.png", totalScore: 10 },
          { name: "Hanna", icon: "person-02.png", totalScore: 0 },
          { name: "Richard", icon: "person-06.png", totalScore: 0 },
          { name: "Rita", icon: "person-07.png", totalScore: 20 },
        ],
      },
      {
        id: "3",
        date: "2024-07-30",
        winner: { name: "Jhoe", icon: "person-03.png", totalScore: 50 },
        second: { name: "Hanna", icon: "person-02.png", totalScore: 10 },
        third: { name: "Samir", icon: "person-01.png", totalScore: 15 },
        another: [
          { name: "Richard", icon: "person-06.png", totalScore: 0 },
          { name: "Rita", icon: "person-07.png", totalScore: 20 },
        ],

        participants: [
          { name: "Jhoe", icon: "person-03.png", totalScore: 50 },
          { name: "Hanna", icon: "person-02.png", totalScore: 10 },
          { name: "Samir", icon: "person-01.png", totalScore: 15 },
          { name: "Richard", icon: "person-06.png", totalScore: 0 },
          { name: "Rita", icon: "person-07.png", totalScore: 20 },
        ],
      },
    ],
  },
];

// Функция для копирования изображений в папку uploads
function copyImageToUploads(filePath) {
  const fileName = path.basename(filePath);
  const destination = path.join("uploads", fileName);
  fs.copyFileSync(filePath, destination);
  return `/uploads/${fileName}`;
}

db.serialize(() => {
  const insertTeamStmt = db.prepare(
    `INSERT INTO teams (id, owner, totalGames, name, image) VALUES (?, ?, ?, ?, ?)`
  );
  const insertMemberStmt = db.prepare(
    `INSERT INTO members (name, icon, totalScore, team_id) VALUES (?, ?, ?, ?)`
  );
  const insertMatchStmt = db.prepare(
    `INSERT INTO matches (id, date, team_id) VALUES (?, ?, ?)`
  );
  const insertMatchResultStmt = db.prepare(
    `INSERT INTO match_results (match_id, position, member_name, member_icon, member_score) VALUES (?, ?, ?, ?, ?)`
  );

  teams.forEach((team) => {
    const teamImage = copyImageToUploads(team.image);
    insertTeamStmt.run(
      team.id,
      team.owner,
      team.totalGames,
      team.name,
      teamImage
    );

    team.members.forEach((member) => {
      insertMemberStmt.run(
        member.name,
        member.icon,
        member.totalScore,
        team.id
      );
    });

    team.matchesHistory.forEach((match) => {
      insertMatchStmt.run(match.id, match.date, team.id);

      insertMatchResultStmt.run(
        match.id,
        1,
        match.winner.name,
        match.winner.icon,
        match.winner.totalScore
      );

      insertMatchResultStmt.run(
        match.id,
        2,
        match.second.name,
        match.second.icon,
        match.second.totalScore
      );

      insertMatchResultStmt.run(
        match.id,
        3,
        match.third.name,
        match.third.icon,
        match.third.totalScore
      );

      match.another.forEach((member, index) => {
        insertMatchResultStmt.run(
          match.id,
          4 + index,
          member.name,
          member.icon,
          member.totalScore
        );
      });

      match.participants.forEach((member, index) => {
        insertMatchResultStmt.run(
          match.id,
          4 + match.another.length + index,
          member.name,
          member.icon,
          member.totalScore
        );
      });
    });
  });

  insertTeamStmt.finalize();
  insertMemberStmt.finalize();
  insertMatchStmt.finalize();
  insertMatchResultStmt.finalize();
  console.log("Data inserted successfully");
});
