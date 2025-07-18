const path = require('path');
const fs = require('fs');
const { insertPost } = require('../queries/postQueries');

const addPost = (req, res) => {
  const { user_id, post, is_anonymous } = req.body;
  let media_url = null;

  if (req.file) {
    const filePath = `/uploads/${req.file.filename}`;
    media_url = `http://localhost:3000${filePath}`;
  }

  insertPost(user_id, post, is_anonymous, media_url, (err, newPost) => {
    if (err) {
      return res.status(500).json({ error: 'Error inserting post', details: err.message });
    }
    res.status(201).json({ post: newPost });
  });
};

module.exports = { addPost };
