const express = require("express");
const router = express.Router();

const teamsController = require("../controllers/teamsController");
const fightersController = require("../controllers/fightersController");
const upload = require("../config/multer"); // Импортируйте конфигурацию Multer

// Fighters routes
router.get("/fighters", fightersController.getAllFighters);
router.get("/fighter", fightersController.getFighterByName);

// Teams routes
router.get("/teams", teamsController.getAllTeams);
router.get("/teams/:id", teamsController.getTeamById);
router.post("/teams", upload.single("image"), teamsController.createTeam);
router.put("/teams/:id", upload.single("image"), teamsController.updateTeam);

module.exports = router;
