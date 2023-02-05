const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = 'mongodb+srv://root:b7J2VPGRF8cPYcJT@boardgames.4thz9eh.mongodb.net/?retryWrites=true&w=majority'

const connect = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connect;

