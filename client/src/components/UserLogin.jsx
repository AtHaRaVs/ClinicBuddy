import React from "react";
import { useFormik } from "formik";
import "../components/userLogin.css";

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.dob) {
    errors.dob = "Required";
  }

  if (!values.gender) {
    errors.gender = "Required";
  }

  if (!values.medicationAllergies) {
    errors.medicationAllergies = "Required";
  }

  if (!values.foodAllergies) {
    errors.foodAllergies = "Required";
  }

  if (!values.environmentalAllergies) {
    errors.environmentalAllergies = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!values.consentEHR) {
    errors.consentEHR = "Please accept the terms";
  }

  return errors;
};

export default function UserRegistration() {
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      mobNum: "",
      dob: "",
      gender: "",
      medicationAllergies: "",
      foodAllergies: "",
      environmentalAllergies: "",
      chronicConditions: "",
      currentMedications: "",
      consentEHR: false,
      consentReminders: false,
      password: "",
      address: "",
      pinCode: "",
    },
    validate,
    onSubmit: async (values, formikHelpers) => {
      const { setSubmitting, resetForm } = formikHelpers;

      try {
        const response = await fetch(
          "http://localhost:8000/api/patients/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not okay");
        }

        const data = await response.json();
        alert("registration successful");
      } catch (error) {
        alert("Registration failed. Please try again.");
        console.error(error);
      } finally {
        setSubmitting(false); // mark submission as finished
      }
    },
  });

  return (
    <div className="registration-container">
      {/* Left side with background and welcome content */}
      <div className="welcome-section">
        <div className="background-overlay"></div>
        <div className="welcome-content">
          <div className="silhouette-birds"></div>
          <div className="moon"></div>
          <h1 className="welcome-title">
            Welcome to Clinic Buddy - AI-Powered Clinical Intelligence Platform
          </h1>
          <p className="welcome-description">
            Join our platform to manage your health records, track medications,
            and connect with healthcare professionals seamlessly.
            Revolutionizing Indian healthcare with AI-powered clinic management
            to reduce patient wait times by 40% and increase clinic revenue by
            25%.
          </p>
        </div>
        <div className="floating-particles"></div>
      </div>

      {/* Right side with registration form */}
      <div className="form-section">
        <div className="form-header">
          <div className="form-tabs">
            <button className="tab-button">Sign In</button>
            <button className="tab-button active">Register</button>
          </div>
        </div>

        <div className="form-container">
          <h2 className="form-title">Register</h2>

          <form onSubmit={formik.handleSubmit} className="registration-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">FIRST NAME</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter Your First Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  className={
                    formik.touched.firstName && formik.errors.firstName
                      ? "error"
                      : ""
                  }
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="error-message">{formik.errors.firstName}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">LAST NAME</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter Your Last Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  className={
                    formik.touched.lastName && formik.errors.lastName
                      ? "error"
                      : ""
                  }
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="error-message">{formik.errors.lastName}</div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Your Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={
                  formik.touched.email && formik.errors.email ? "error" : ""
                }
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-message">{formik.errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="mobNum">MOBILE NUMBER</label>
              <input
                id="mobNum"
                name="mobNum"
                type="tel"
                placeholder="Enter Your Mobile Number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobNum}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dob">DATE OF BIRTH</label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dob}
                  max={new Date().toISOString().split("T")[0]}
                  className={
                    formik.touched.dob && formik.errors.dob ? "error" : ""
                  }
                />
                {formik.touched.dob && formik.errors.dob && (
                  <div className="error-message">{formik.errors.dob}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="gender">GENDER</label>
                <select
                  id="gender"
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                  className={
                    formik.touched.gender && formik.errors.gender ? "error" : ""
                  }
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="error-message">{formik.errors.gender}</div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="medicationAllergies">MEDICATION ALLERGIES</label>
              <select
                id="medicationAllergies"
                name="medicationAllergies"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.medicationAllergies}
                className={
                  formik.touched.medicationAllergies &&
                  formik.errors.medicationAllergies
                    ? "error"
                    : ""
                }
              >
                <option value="" disabled>
                  Select Medication Allergy
                </option>
                <option value="Antibiotics">Antibiotics</option>
                <option value="Anesthesia">Anesthesia</option>
                <option value="None">None</option>
              </select>
              {formik.touched.medicationAllergies &&
                formik.errors.medicationAllergies && (
                  <div className="error-message">
                    {formik.errors.medicationAllergies}
                  </div>
                )}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="foodAllergies">FOOD ALLERGIES</label>
                <select
                  id="foodAllergies"
                  name="foodAllergies"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.foodAllergies}
                  className={
                    formik.touched.foodAllergies && formik.errors.foodAllergies
                      ? "error"
                      : ""
                  }
                >
                  <option value="" disabled>
                    Select Food Allergy
                  </option>
                  <option value="Dairy">Dairy</option>
                  <option value="Nuts">Nuts</option>
                  <option value="None">None</option>
                </select>
                {formik.touched.foodAllergies &&
                  formik.errors.foodAllergies && (
                    <div className="error-message">
                      {formik.errors.foodAllergies}
                    </div>
                  )}
              </div>

              <div className="form-group">
                <label htmlFor="environmentalAllergies">
                  ENVIRONMENTAL ALLERGIES
                </label>
                <select
                  id="environmentalAllergies"
                  name="environmentalAllergies"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.environmentalAllergies}
                  className={
                    formik.touched.environmentalAllergies &&
                    formik.errors.environmentalAllergies
                      ? "error"
                      : ""
                  }
                >
                  <option value="" disabled>
                    Select Environmental Allergy
                  </option>
                  <option value="Dust">Dust</option>
                  <option value="Pollen">Pollen</option>
                  <option value="None">None</option>
                </select>
                {formik.touched.environmentalAllergies &&
                  formik.errors.environmentalAllergies && (
                    <div className="error-message">
                      {formik.errors.environmentalAllergies}
                    </div>
                  )}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="currentMedications">CURRENT MEDICATIONS</label>
              <textarea
                id="currentMedications"
                name="currentMedications"
                rows={3}
                placeholder="List your current medications or write 'None'"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentMedications}
              />
            </div>
            <div className="form-group">
              <label htmlFor="chronicConditions">CHRONIC CONDITIONS</label>
              <textarea
                id="chronicConditions"
                name="chronicConditions"
                placeholder="List chronic conditions like Diabetes, Hypertension, etc. Write 'None' if you have none."
                rows={3}
                value={formik.values.chronicConditions}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="section-divider">
              <h3 className="section-title">Address Information</h3>
            </div>
            <div className="form-group">
              <label htmlFor="address">FULL ADDRESS</label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Enter your complete address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pinCode">PIN CODE</label>
              <input
                id="pinCode"
                name="pinCode"
                type="text"
                placeholder="Enter your PIN code"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pinCode}
              />
            </div>
            <div className="section-divider">
              <h3 className="section-title">Security Setup</h3>
            </div>
            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={
                  formik.touched.password && formik.errors.password
                    ? "error"
                    : ""
                }
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error-message">{formik.errors.password}</div>
              )}
            </div>
            <div className="section-divider">
              <h3 className="section-title">Consent & Agreement</h3>
            </div>
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="consentEHR"
                name="consentEHR"
                onChange={formik.handleChange}
                checked={formik.values.consentEHR}
                className={
                  formik.touched.consentEHR && formik.errors.consentEHR
                    ? "error"
                    : ""
                }
              />
              <label htmlFor="consentEHR" className="checkbox-label">
                I agree All the Statements in{" "}
                <a href="#" className="terms-link">
                  Terms of service
                </a>
              </label>
            </div>
            {formik.touched.consentEHR && formik.errors.consentEHR && (
              <div className="error-message">{formik.errors.consentEHR}</div>
            )}
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="consentReminders"
                name="consentReminders"
                onChange={formik.handleChange}
                checked={formik.values.consentReminders}
              />
              <label htmlFor="consentReminders" className="checkbox-label">
                I agree to appointment reminders via SMS/WhatsApp
              </label>
            </div>
            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
