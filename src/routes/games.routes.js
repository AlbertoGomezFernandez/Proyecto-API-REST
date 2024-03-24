const express = require('express');
const Game = require('../models/Game.model');
const router = express.Router();


router.get('/', (req, res) => {
  return Game.find()
    .then(games => {
      return res.status(200).json(games);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const game = await Game.findById(id);
    if (game) {
      return res.status(200).json(game);
    } else {
      return res.status(404).json("No game found by this id");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const newGame = new Game({
      name: req.body.name,
      plataform: req.body.plataform,
      web: req.body.web,
      score: req.body.score,
    });
    const createdGame = await newGame.save();
    return res.status(201).json(createdGame);
  } catch (error) {
    next(error);
  }
});

router.put('/edit/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const gameModify = new Game(req.body);
    gameModify._id = id;
    const gameUpdated = await Game.findByIdAndUpdate(id, gameModify);
    return res.status(200).json(gameUpdated);
  } catch (error) {
    return next(error);
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Game.findByIdAndDelete(id);
    return res.status(200).json("Game deleted");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;