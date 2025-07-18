const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { addPost } = require('../controllers/addPostsController');
const { getPostsWithUsernames } = require('../controllers/postController');

// Configure multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post('/addposts', upload.single('file'), addPost);
router.get('/allposts', getPostsWithUsernames);

module.exports = router;
