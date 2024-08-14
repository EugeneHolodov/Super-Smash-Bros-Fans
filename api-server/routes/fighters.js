const express = require("express");
const router = express.Router();
const fightersController = require("../controllers/fightersController");

// Fighters routes
router.get("/fighters", fightersController.getAllFighters);
router.get("/fighter", fightersController.getFighterByName);

module.exports = router;

