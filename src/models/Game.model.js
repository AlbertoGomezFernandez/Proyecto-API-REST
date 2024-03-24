const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const gameSchema = new Schema(
  {
    name: { type: String, required: true },
    plataform: { type: String },
    web: { type: String, required: true },
    score: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);


const Game = mongoose.model('Game', gameSchema);
module.exports = Game;