const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../../db');
const { insertIntoUsers, insertIntoUserCredentials } = require('../queries/registerUser');

// Setup multer for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/profile_pics';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile_${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

const createAccount = async (req, res) => {
  const { contact_info, username, password, name, bio } = req.body;
  const profilePicUrl = req.file ? `http://localhost:3000/uploads/profile_pics/${req.file.filename}` : null;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const userId = await insertIntoUsers(name, username, bio, profilePicUrl); // updated
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
  upload
};
