// controllers/authController.js
const { checkUserCredentials } = require('../queries/checkCredentials');

const login = (req, res) => {
    const { contact_info, password } = req.body;

    checkUserCredentials(contact_info, password, (error, isValid) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (isValid) {
            return res.status(200).json({ message: 'OK' });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });
};



module.exports = {
    login,
};
