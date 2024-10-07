require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {});
const db = mongoose.connection;

const postSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    date: String,
}, { collection: 'Blogs' });

const commentSchema = new mongoose.Schema({
    postId: String,
    userId: String,
    userPicture: String,
    userName: String,
    content: String,
    date: String,
}, { collection: 'Comments' });

const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401); 

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user; 
        next(); 
    });
};

app.get('/Blogs', async (req, res) => {
    try {
        const blogs = await Post.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/Blogs', authenticateToken, async (req, res) => {
    const { title, author, content, date } = req.body;

    const newPost = new Post({
        title,
        author,
        content,
        date,
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error saving post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/Comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/', (req, res) => {
    res.send('API up and running!');
});

db.once('open', () => {
    console.log('MongoDB connected');
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`PORT: ${PORT}`);
});
