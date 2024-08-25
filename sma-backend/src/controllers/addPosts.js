// controllers/addPost.js
const pool = require('../../db');

const addPost = (req, res) => {
    const { user_id, post } = req.body;

    if (!user_id || !post) {
        return res.status(400).json({ error: 'user_id and post are required.' });
    }

    pool.query(
        "INSERT INTO posts (user_id, post) VALUES ($1, $2) RETURNING *",
        [user_id, post],
        (error, results) => {
            if (error) throw error;
            res.status(201).json({
                message: 'Post created successfully',
                post: results.rows[0],
            });
        }
    );
};

module.exports = {
    addPost,
};
