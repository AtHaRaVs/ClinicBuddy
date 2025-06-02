const express = require("express");
const router = express.Router();
const patientRoutes = require("./patientRoutes");

router.use("/patients", patientRoutes);

module.exports = router;
