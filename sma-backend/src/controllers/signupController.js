const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../../db');
const { insertIntoUsers, insertIntoUserCredentials } = require('../queries/registerUser');

// Setup multer for handling profile and banner images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/profile_pics';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}_${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

// Multer middleware to handle two files: profile and banner
const uploadFields = upload.fields([
  { name: 'profile_pic', maxCount: 1 },
  { name: 'banner_pic', maxCount: 1 }
]);

const createAccount = async (req, res) => {
  const { contact_info, username, password, name, bio } = req.body;

  // Uploaded file URLs
  const profilePicUrl = req.files['profile_pic']
    ? `http://localhost:3000/uploads/profile_pics/${req.files['profile_pic'][0].filename}`
    : null;

  const bannerPicUrl = req.files['banner_pic']
    ? `http://localhost:3000/uploads/profile_pics/${req.files['banner_pic'][0].filename}`
    : null;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const userId = await insertIntoUsers(client, name, username, bio, profilePicUrl, bannerPicUrl);
    await insertIntoUserCredentials(client, contact_info, name, username, password, userId);

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
