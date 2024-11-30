const express = require("express");
const UniversityController = require("../controllers/university.controller");
const router = express.Router();

router.post("/university/signup", UniversityController.signup);
router.post("/university/signin", UniversityController.signin);

module.exports = router;