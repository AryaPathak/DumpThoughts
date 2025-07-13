const { insertPost } = require('../queries/postQueries');

const addPost = (req, res) => {
  const { user_id, post, is_anonymous } = req.body;

  insertPost(user_id, post, is_anonymous, (err, newPost) => {
    if (err) {
      return res.status(500).json({ error: 'Error inserting post', details: err.message });
    }
    res.status(201).json({ post: newPost });
  });
};

module.exports = { addPost };
