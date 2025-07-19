// routes/authRoutes.js
const { Router } = require('express');
const { login } = require('../controllers/authController');
const { createAccount, upload } = require('../controllers/signupController');

const router = Router();

router.post('/login', login);
router.post('/create-account', upload.single('profile_pic'), createAccount);



module.exports = router;
