const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    message: String,
    name: String,
}, { timestamps: true });

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;