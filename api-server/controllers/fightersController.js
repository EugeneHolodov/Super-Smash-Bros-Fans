const db = require("../db");

exports.getAllFighters = (req, res) => {
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
};

exports.getFighterByName = (req, res) => {
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
};
