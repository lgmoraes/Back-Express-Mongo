const express = require("express");
const stuffCtrl = require("../controllers/excuse");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, stuffCtrl.getAllExcuses);
router.get("/:http_code", auth, stuffCtrl.getExcuses);
router.post("/", auth, stuffCtrl.createExcuse);

module.exports = router;
