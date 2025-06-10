// components/RegistrationForm.jsx
import { EmailVerificationField } from "./ui/EmailVerificationField";
import { FormField } from "./ui/FormField";

export const RegistrationForm = ({
  formik,
  verificationState,
  onSendVerification,
  onCheckVerification,
  isVerified,
}) => {
  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
    { value: "Prefer not to say", label: "Prefer not to say" },
  ];

  const allergyOptions = {
    medication: [
      { value: "Antibiotics", label: "Antibiotics" },
      { value: "Anesthesia", label: "Anesthesia" },
      { value: "None", label: "None" },
    ],
    food: [
      { value: "Dairy", label: "Dairy" },
      { value: "Nuts", label: "Nuts" },
      { value: "None", label: "None" },
    ],
    environmental: [
      { value: "Dust", label: "Dust" },
      { value: "Pollen", label: "Pollen" },
      { value: "None", label: "None" },
    ],
  };

  return (
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
          {/* Basic Info - Always Enabled */}
          <div className="form-row">
            <FormField
              label="FIRST NAME"
              name="firstName"
              placeholder="Enter Your First Name"
              formik={formik}
              disabled={false} // ✅ Always allow typing
            />
            <FormField
              label="LAST NAME"
              name="lastName"
              placeholder="Enter Your Last Name"
              formik={formik}
              disabled={false} // ✅ Always allow typing
            />
          </div>

          {/* Email Verification - Special handling */}
          <EmailVerificationField
            formik={formik}
            verificationState={verificationState}
            onSendVerification={onSendVerification}
            onCheckVerification={onCheckVerification}
            disabled={false} // ✅ Always allow email input
          />

          {/* Password - Always enabled for initial entry */}
          <FormField
            label="PASSWORD"
            name="password"
            type="password"
            placeholder="Create a strong password"
            formik={formik}
            disabled={false} // ✅ Always allow typing
          />

          {/* Contact Info - Always Enabled */}
          <FormField
            label="MOBILE NUMBER"
            name="mobNum"
            type="tel"
            placeholder="Enter Your Mobile Number"
            formik={formik}
            disabled={false} // ✅ Always allow typing
          />

          <div className="form-row">
            <FormField
              label="DATE OF BIRTH"
              name="dob"
              type="date"
              formik={formik}
              disabled={false} // ✅ Always allow typing
            />
            <FormField
              label="GENDER"
              name="gender"
              type="select"
              placeholder="Select Gender"
              options={genderOptions}
              formik={formik}
              disabled={false} // ✅ Always allow selection
            />
          </div>

          {/* Medical Info - Always Enabled */}
          <FormField
            label="MEDICATION ALLERGIES"
            name="medicationAllergies"
            type="select"
            placeholder="Select Medication Allergy"
            options={allergyOptions.medication}
            formik={formik}
            disabled={false} // ✅ Always allow selection
          />

          <div className="form-row">
            <FormField
              label="FOOD ALLERGIES"
              name="foodAllergies"
              type="select"
              placeholder="Select Food Allergy"
              options={allergyOptions.food}
              formik={formik}
              disabled={false} // ✅ Always allow selection
            />
            <FormField
              label="ENVIRONMENTAL ALLERGIES"
              name="environmentalAllergies"
              type="select"
              placeholder="Select Environmental Allergy"
              options={allergyOptions.environmental}
              formik={formik}
              disabled={false} // ✅ Always allow selection
            />
          </div>

          <FormField
            label="CURRENT MEDICATIONS"
            name="currentMedications"
            type="textarea"
            placeholder="List your current medications or write 'None'"
            formik={formik}
            disabled={false} // ✅ Always allow typing
          />

          <FormField
            label="CHRONIC CONDITIONS"
            name="chronicConditions"
            type="textarea"
            placeholder="List chronic conditions like Diabetes, Hypertension, etc. Write 'None' if you have none."
            formik={formik}
            disabled={false} // ✅ Always allow typing
          />

          <div className="section-divider">
            <h3 className="section-title">Address Information</h3>
          </div>

          <FormField
            label="FULL ADDRESS"
            name="address"
            placeholder="Enter your complete address"
            formik={formik}
            disabled={false} // ✅ Always allow typing
          />

          <FormField
            label="PIN CODE"
            name="pinCode"
            placeholder="Enter your PIN code"
            formik={formik}
            disabled={false} // ✅ Always allow typing
          />

          <div className="section-divider">
            <h3 className="section-title">Consent & Agreement</h3>
          </div>

          <div className="checkbox-group">
            <FormField
              name="consentEHR"
              type="checkbox"
              formik={formik}
              disabled={false} // ✅ Always allow checking
            />
            <label htmlFor="consentEHR" className="checkbox-label">
              I agree All the Statements in{" "}
              <a href="#" className="terms-link">
                Terms of service
              </a>
            </label>
          </div>

          <div className="checkbox-group">
            <FormField
              name="consentReminders"
              type="checkbox"
              formik={formik}
              disabled={false} // ✅ Always allow checking
            />
            <label htmlFor="consentReminders" className="checkbox-label">
              I agree to appointment reminders via SMS/WhatsApp
            </label>
          </div>

          {/* Only Submit Button Requires Verification */}
          <button
            type="submit"
            disabled={!isVerified || formik.isSubmitting} // ✅ Keep this - only submit needs verification
            className="submit-button"
          >
            {formik.isSubmitting ? "Registering..." : "Complete Registration"}
          </button>

          {/* Show verification status */}
          {verificationState.status === "sent" && (
            <div className="verification-status">
              <p>📧 Verification email sent to {formik.values.email}</p>
              <p>Please check your inbox and click the verification link.</p>
              <p>
                You can continue filling the form while waiting for
                verification.
              </p>
            </div>
          )}

          {!isVerified && (
            <div className="verification-notice">
              <p>
                ℹ️ Please verify your email to enable registration submission.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
