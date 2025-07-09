const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobNum: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    dob: Date,
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    medicationAllergies: [String],
    foodAllergies: [String],
    environmentalAllergies: [String],
    chronicConditions: [String],
    currentMedications: [String],
    address: String,
    pinCode: Number,
    emailVerified: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
