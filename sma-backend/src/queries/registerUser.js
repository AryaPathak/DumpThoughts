const insertIntoUsers = async (client, name, username, bio, profile_pic_url, profile_banner_url) => {
  const userResult = await client.query(
    `INSERT INTO users (name, username, bio, profile_pic_url, profile_banner_url)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING user_id`,
    [name, username, bio, profile_pic_url, profile_banner_url]
  );
  return userResult.rows[0].user_id;
};

const insertIntoUserCredentials = async (client, contact_info, name, username, password, userId) => {
  await client.query(
    `INSERT INTO user_credentials (contact_info, name, username, password, user_id)
     VALUES ($1, $2, $3, $4, $5)`,
    [contact_info, name, username, password, userId]
  );
};

module.exports = {
  insertIntoUsers,
  insertIntoUserCredentials,
};
