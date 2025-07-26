// routes/authRoutes.js
const { Router } = require('express');
const { login } = require('../controllers/authController');
const { createAccount, upload } = require('../controllers/signupController');

const router = Router();

router.post('/login', login);
router.post(
  '/create-account',
  upload.fields([
    { name: 'profile_pic', maxCount: 1 },
    { name: 'banner_pic', maxCount: 1 }
  ]),
  createAccount
);


module.exports = router;
