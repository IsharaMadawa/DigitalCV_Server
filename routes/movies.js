const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let movies = await Movie.find().select("-__v").sort("title");
  res.send(movies);
});
router.get("/:id", auth, async (req, res) => {
  let movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  await movie.save();
  res.send(movie);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  var movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    },
    { new: true }
  );
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
});

module.exports = router;
