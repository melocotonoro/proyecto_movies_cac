const pool = require("./connectionMysql.js");

const getMovies = async (req, res) => {
  try {
    const [result] = await pool.query("select * from movies");
    res.json(result);
  } catch (error) {
    res.status(404).type("txt").send("404 Not Found");
  }
};

const getMovie = async (req, res) => {
  try {
    const [movie] = await pool.query("select * from movies where id=?", [
      parseInt(req.params.id),
    ]);

    if (movie.length == 0) {
      return res.status(404).type("txt").send("404 Not Found");
    }
    res.json(movie);
    console.log(movie);
  } catch (error) {
    res.status(404).type("txt").send("404 Not Found");
  }
};

module.exports = { getMovies, getMovie };
