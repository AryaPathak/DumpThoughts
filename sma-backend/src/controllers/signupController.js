const pool = require('../../db');
const { insertIntoUsers, insertIntoUserCredentials } = require('../queries/registerUser');

const createAccount = async (req, res) => {
    const { contact_info, username, password, name, bio } = req.body;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Insert into users table and get user_id
        const userId = await insertIntoUsers(name, username, bio);

        // Insert into user_credentials table
        await insertIntoUserCredentials(contact_info, name, username, password, userId);

        await client.query('COMMIT');
        res.status(201).send('Account created successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating account:', error);
        res.status(500).send('Error creating account');
    } finally {
        client.release();
    }
};

module.exports = {
    createAccount,
};
