// routes/authRoutes.js
const { Router } = require('express');
const { login } = require('../controllers/authController');
const { createAccount } = require('../controllers/signupController');

const router = Router();

router.post('/login', login);
router.post('/create-account', createAccount);



module.exports = router;
