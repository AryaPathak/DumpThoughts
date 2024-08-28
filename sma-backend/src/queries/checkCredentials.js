// db/queries.js
const pool = require('../../db'); // Adjust the path as per your directory structure

const checkUserCredentials = (contactInfo, password, callback) => {
    pool.query(
        'SELECT user_id FROM user_credentials WHERE contact_info = $1 AND password = $2',
        [contactInfo, password],
        (error, results) => {
            if (error) {
                return callback(error);
            }
            if (results.rows.length > 0) {
                return callback(null, { isValid: true, userId: results.rows[0].user_id });
            } else {
                return callback(null, { isValid: false });
            }
        }
    );
};

module.exports = {
    checkUserCredentials,
};
