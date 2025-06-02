const express = require("express");
const router = express.Router();

const { registerPatient } = require("../controller/patientController");

router.post("/register", registerPatient);

module.exports = router;
