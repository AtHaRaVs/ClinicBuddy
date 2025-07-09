const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobNum: { type: String, required: true, unique: true },
  dob: Date,
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  Specialization: {
    type: [String],
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  experience: Number,
  address: String,
  pinCode: Number,
  emailVerified: Boolean,
});

module.exports = mongoose.model("Doctor", doctorSchema);
