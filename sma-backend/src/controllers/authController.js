// controllers/authController.js
const { checkUserCredentials } = require('../queries/checkCredentials');

const login = (req, res) => {
    const { contact_info, password } = req.body;

    checkUserCredentials(contact_info, password, (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.isValid) {
            return res.status(200).json({ message: 'OK', user_id: result.userId });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });
};

module.exports = {
    login,
};
