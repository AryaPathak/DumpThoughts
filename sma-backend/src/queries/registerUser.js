const pool = require('../../db');

const insertIntoUsers = async (name, username, bio) => {
    const client = await pool.connect();
    try {
        const userResult = await client.query(
            `INSERT INTO users (name, username, bio)
             VALUES ($1, $2, $3)
             RETURNING user_id`,
            [name, username, bio]
        );
        return userResult.rows[0].user_id;
    } finally {
        client.release();
    }
};

const insertIntoUserCredentials = async (contact_info, name, username, password, userId) => {
    const client = await pool.connect();
    try {
        await client.query(
            `INSERT INTO user_credentials (contact_info, name, username, password, user_id)
             VALUES ($1, $2, $3, $4, $5)`,
            [contact_info, name, username, password, userId]
        );
    } finally {
        client.release();
    }
};

module.exports = {
    insertIntoUsers,
    insertIntoUserCredentials,
};
