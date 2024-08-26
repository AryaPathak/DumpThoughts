// routes/postRoutes.js
const { Router } = require('express');
const { addPost } = require('../controllers/addPostsController'); // Destructure the addPost function
const { getPostsWithUsernames } = require('../controllers/postController'); // Destructure getPostsWithUsernames
const router = Router();

router.post('/addposts', addPost);
router.get('/allposts', getPostsWithUsernames);

module.exports = router;
