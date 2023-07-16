const express = require("express");
const userCtrl = require("../controllers/user");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

const router = express.Router();

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/avatar", auth, multer, userCtrl.setAvatar);

module.exports = router;
