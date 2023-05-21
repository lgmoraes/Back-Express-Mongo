const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/excuse");

router.get("/", stuffCtrl.getExcuses);
router.post("/", stuffCtrl.createExcuse);

module.exports = router;
