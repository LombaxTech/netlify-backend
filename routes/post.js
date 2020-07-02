const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/posts', async (req, res) => {
    try {
        let posts = await Post.find();
        return res.json(posts);   
    } catch (error) {
        return res.json({ error });
    }
});

router.post('/post', async (req, res) => {
    const { message, name } = req.body;
    if (!message || !name) return res.status(400).json({ error: "You must have a name and a message" })
    let post = new Post({ name, message });
    try {
        post = await post.save();
        return res.json({ success: true, post });
    } catch (error) {
        return res.json({ error });
    }
});

module.exports = router;