const express = require('express');
const multer = require('multer');
const postModel = require('./models/post.model');
const uploadFile = require('./services/storage.service');
const cors = require('cors');

const upload = multer({ storage: multer.memoryStorage() });
const app = express();
app.use(cors());
app.use(express.json());

app.post('/create-post', upload.single('image'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const result = await uploadFile(req.file.buffer);
    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    });
    return res.status(201).json({
        message: 'Post created successfully',
        post
    })
});

app.get('/posts', async (req, res) => {
    const posts = await postModel.find().sort({ createdAt: -1 }); // Sort posts by creation date in descending order
    return res.status(200).json({
        message: 'Posts fetched successfully',
        posts
    })
});
app.delete('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const deletedPost = await postModel.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json({ message: 'Post deleted successfully', post: deletedPost });
    } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = app;