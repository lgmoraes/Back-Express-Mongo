const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/excuse");

router.get("/", stuffCtrl.getAllExcuses);
router.get("/:http_code", stuffCtrl.getExcuses);
router.post("/", stuffCtrl.createExcuse);

module.exports = router;
