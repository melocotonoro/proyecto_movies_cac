const express = require("express");
const moviesController = require("../controllers/moviesController");
const { route } = require("./root");

const router = express.Router();

router
  .route("/")
  .get(moviesController.getMovies)
  .post(moviesController.createMovie);

router
  .route("/:id")
  .get(moviesController.getMovie)
  .delete(moviesController.deleteMovie)
  .put(moviesController.updateMovie);

module.exports = router;
