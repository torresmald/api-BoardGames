const mongoose = require('mongoose');

const boardGamesSchema = new mongoose.Schema({
    id: {type: String, unique: true},
    title: { type: String, unique: true },
    designer: { type: [String] },
    publisher: String,
    year: { type: Number, min: 1895, max: 2023 },
    category: { type: String, enum: ['Abstract', 'Area Control', 'Ameritrash', 'Campaign', 'Deckbuilder', 'Deckbuilding','Deck Construction', 'Dexterity', 'Drafting', 'Dungeon Crawler', 'Engine Builder', 'Eurogame', 'Party Game', 'Push your Luck', 'Roll and Move', 'Roll and Write', 'Social Deduction', 'Storytelling', 'Worker-placement', 'Wargame'] },
    picture: String,
    players: { type: [String], enum: ['1 Jugador', '2 Jugadores', '4 Jugadores', '1/4 Jugadores', '1/5 Jugadores','2/4 Jugadores', '2/5 Jugadores','2/8 Jugadores', '2/10 Jugadores', '3/4 Jugadores','5 Jugadores', '5+ Jugadores'] },
    weight: { type: Number, min: 1, max: 5 },
    playingTime: { type: [String], enum: ['-15 Minutos', '15 Minutos', '30 Minutos', '30/60 Minutos', '1 Hora', '1/2 Horas', '2/3 Horas', '+3 Horas']},
    isForChilds: Boolean,
    favoriteCount: Number
},
    {
        timestamps: true
    });


const Game = mongoose.model('Game', boardGamesSchema);
module.exports = Game;

