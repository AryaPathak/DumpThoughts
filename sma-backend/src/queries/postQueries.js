// queries/postQueries.js
const getPostsWithUsernamesQuery = `
  SELECT p.post_id, p.post, p.created_at, u.username, p.user_id, p.media_url, p.is_anonymous, u.profile_pic_url
  FROM posts p 
  INNER JOIN users u ON p.user_id = u.user_id
  ORDER BY p.created_at DESC;
`;
const pool = require('../../db');
const insertPost = (user_id, post, is_anonymous, media_url, callback) => {
  const query = `
    INSERT INTO posts (user_id, post, is_anonymous, media_url)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [user_id, post, is_anonymous, media_url];

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
