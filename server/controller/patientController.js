const Patient = require("../models/patientModel");
const { v4: uuidv4 } = require("uuid");

const registerPatient = async (req, res) => {
  try {
    const patient = new Patient({
      ...req.body,
      patientId: uuidv4(),
    });
    console.log("Received registration data:", req.body);
    const patientId = patient.patientId;
    console.log("patient created:", patient);
    const existingUser = await Patient.findOne({ patientId });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    await patient.save();

    res.status(201).json({
      message: "Patient registered successfully",
      patientId: patient.patientId,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerPatient };
