// queries/postQueries.js
const getPostsWithUsernamesQuery = `
  SELECT p.post_id, p.post, p.created_at, u.username, p.user_id
  FROM posts p 
  INNER JOIN users u ON p.user_id = u.user_id
  ORDER BY p.created_at DESC;
`;
const pool = require('../../db');
const insertPost = (user_id, post, callback) => {
  const query = "INSERT INTO posts (user_id, post) VALUES ($1, $2) RETURNING *";
  const values = [user_id, post];

  pool.query(query, values, (error, results) => {
      if (error) {
          callback(error, null);
      } else {
          callback(null, results.rows[0]);
      }
  });
};

module.exports = {
  getPostsWithUsernamesQuery,
  insertPost
};
