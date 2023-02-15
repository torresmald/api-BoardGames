require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const server = express();
const gamesRouter = require('./routes/games.routes.js');
const categoriesRouter = require('./routes/categories.routes.js');
const userRouter = require('./routes/user.routes.js');
const connect = require('./utils/db/connect.js');
const path = require('path');
const cloudinary = require('cloudinary');
const createError = require('./utils/errors/createError.js');
const cors = require('cors');


connect();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// const whitelist = ['http://localhost:4200', 'http://localhost:3000']
// const corsOptions = {
//   credentials: true,
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// };
server.use(cors());
require('./utils/authentication/passport.js');
server.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 14400000,
    SameSite: 'None'
  },
  store: MongoStore.create({
    mongoUrl: DB_URL
  })
}));

server.use(passport.initialize());
server.use(passport.session());

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, '/tmp/')));

server.get('/', (request, response) => {
  response.status(200).json('Bienvenido a mi API de BoardGames.')
})

server.use('/users', userRouter);
server.use('/games', gamesRouter);
server.use('/categories', categoriesRouter);
server.use('*', (request, response, next) => {
  next(createError(`Esta ruta no existe`, 404))
});
server.use((error, request, response, next) => {
  return response.status(error.status || 500).json(error.message || 'Unexpected Error')
});

server.listen(PORT, () => {
  console.log(`Listening in http://localhost:${PORT}`);
});

module.exports = server;