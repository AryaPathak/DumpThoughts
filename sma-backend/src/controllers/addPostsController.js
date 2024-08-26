// controllers/addPost.js
const { insertPost } = require('../queries/postQueries');

const addPost = (req, res) => {
    const { user_id, post } = req.body;

    if (!user_id || !post) {
        return res.status(400).json({ error: 'user_id and post are required.' });
    }

    insertPost(user_id, post, (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to create post' });
        }
        res.status(201).json({
            message: 'Post created successfully',
            post: result,
        });
    });
};

module.exports = {
    addPost,
};
