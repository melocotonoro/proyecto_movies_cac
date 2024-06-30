const { route } = require("../routes/root.js");
const pool = require("./connectionMysql.js");

const getMovies = async (req, res) => {
  try {
    const [result] = await pool.query("select * from movies");
    res.status(200).json(result);
  } catch (err) {
    console.error({ error: err });
    res.status(500).json({ msg: "Error getting all movies" });
  }
};

const getMovie = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [result] = await pool.query(
      "select * from mymovies.movies where id=?",
      [id]
    );

    if (result.length === 0) {
      res.status(404).json({ msg: `Movie with id '${id}' not found` });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    console.error({ error: err });
    res.status(500).json({ msg: "Error getting the movie" });
  }
};

const createMovie = async (req, res) => {
  try {
    const { title, director, date, cover, country, genre } = req.body;

    const [movieInDatabase] = await pool.query(
      "select * from mymovies.movies where titulo=?",
      [title]
    );

    if (movieInDatabase.length !== 0) {
      res
        .status(409)
        .json({ msg: `Movie with name '${title}' already in database` });
    } else {
      const [result, data] = await pool.query(
        "insert into mymovies.movies values (null, ?, ?, ?, ?, ?, ?) ",
        [title, director, date, cover, country, genre]
      );

      if (result.affectedRows > 0) {
        res
          .status(201)
          .json({ msg: `Movie with title '${title}' succesfully created` });
      }
    }
  } catch (err) {
    console.error({ error: err });
    res.status(500).json({ msg: "Error creating the movie" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [result] = await pool.query(
      "delete from mymovies.movies where id=?",
      [id]
    );

    console.log(result);

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ msg: `Movie with id '${id}' succesfully deleted` });
    } else {
      res.status(404).json({ msg: `Movie with id '${id}' not found` });
    }
  } catch (err) {
    console.error({ error: err });
    res.status(500).json({ msg: "Error deleting the movie" });
  }
};

const updateMovie = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, director, date, cover, country, genre } = req.body;

    const [movieInDatabase] = await pool.query(
      "select * from mymovies.movies where titulo=?",
      [title]
    );

    const [result] = await pool.query(
      "update mymovies.movies set titulo=?, director=?, fecha_lanzamiento=?, imagen=?, pais=?, genero=? where id=?",
      [title, director, date, cover, country, genre, id]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ msg: `Movie with id ${id} succesfully updated` });
    } else {
      res.status(404).json({ msg: `Movie with id '${id}' not found` });
    }
  } catch (err) {
    console.error({ error: err });
    res.status(500).json({ msg: "Error updating the movie" });
  }
};
module.exports = { getMovies, getMovie, createMovie, deleteMovie, updateMovie };
