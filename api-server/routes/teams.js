const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const teamsController = require("../controllers/teamsController");
const {checkJwt, logJwtError} = require("../config/authMiddleware")

// Teams routes
router.use(logJwtError);

router.get("/teams", teamsController.getAllTeams);
router.get("/teams/:id", teamsController.getTeamById);
router.post(
  "/teams",
  checkJwt,
  upload.single("image"),
  teamsController.createTeam
);
router.put(
  "/teams/:id",
  checkJwt,
  upload.single("image"),
  teamsController.updateTeam
);
router.get("/teams/owner/:owner", teamsController.getTeamByOwner);

module.exports = router;
