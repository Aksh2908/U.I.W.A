const express = require("express");
const InspectorController = require("../controllers/inspector.controller");
const router = express.Router();

router.post("/inspector/signup", InspectorController.signup);
router.post("/inspector/signin", InspectorController.signin);

module.exports = router;