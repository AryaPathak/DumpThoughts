// controllers/postController.js
const pool = require('../../db');
const { getPostsWithUsernamesQuery } = require('../queries/postQueries');

const getPostsWithUsernames = async (req, res) => {
  try {
    const { rows } = await pool.query(getPostsWithUsernamesQuery);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getPostsWithUsernames,
};
