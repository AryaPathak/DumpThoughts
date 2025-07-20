const { Router } = require("express");
const controller = require('../controllers/getAllUsers')
const router = Router();

router.get("/", controller.getUsers)
router.get("/:userId", controller.getUserById);

module.exports = router;