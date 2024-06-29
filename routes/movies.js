const express = require("express");
const moviesController = require("../controllers/moviesController");

const router = express.Router();

router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMovie);

module.exports = router;
