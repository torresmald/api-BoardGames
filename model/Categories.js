const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    id: {type: String, unique: true},
    name: { type: String, unique: true },
    description: String,
},
    {
        timestamps: true
    });


const Category = mongoose.model('Category', categoriesSchema);
module.exports = Category;