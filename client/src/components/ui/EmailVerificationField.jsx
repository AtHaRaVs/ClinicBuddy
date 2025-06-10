// components/ui/EmailVerificationField.jsx

export const EmailVerificationField = ({
  formik,
  verificationState,
  onSendVerification,
  onCheckVerification,
  disabled,
}) => {
  const getVerificationButtonText = () => {
    switch (verificationState.status) {
      case "sending":
        return "Sending...";
      case "sent":
        return "Check Verification";
      case "checking":
        return "Checking...";
      case "verified":
        return "✓ Verified";
      default:
        return "Send Verification";
    }
  };

  const handleClick = () => {
    if (["sent", "checking"].includes(verificationState.status)) {
      onCheckVerification();
    } else {
      onSendVerification();
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="email">EMAIL</label>
      <div className="email-input-container">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter Your Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          disabled={disabled || verificationState.status === "verified"}
          className={formik.touched.email && formik.errors.email ? "error" : ""}
        />
        <button
          type="button"
          onClick={handleClick}
          disabled={
            !formik.values.email ||
            ["sending", "checking"].includes(verificationState.status)
          }
          className={`verification-btn ${verificationState.status}`}
        >
          {getVerificationButtonText()}
        </button>
      </div>
      {formik.touched.email && formik.errors.email && (
        <div className="error-message">{formik.errors.email}</div>
      )}
    </div>
  );
};
