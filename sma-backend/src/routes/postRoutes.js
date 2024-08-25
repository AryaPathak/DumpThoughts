// routes/postRoutes.js
const { Router } = require('express');
const controller = require('../controllers/addPosts');
const router = Router();

router.post("/", controller.addPost);

module.exports = router;
