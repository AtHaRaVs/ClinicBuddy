// components/UserRegistration.jsx
import { useState } from "react";
import { useFormik } from "formik";
import {
  registrationValidation,
  initialFormValues,
} from "../validation/registrationSchema";
import { RegistrationForm } from "./RegistrationForm";
import "./userLogin.css";
import { useEmailVerification } from "../hooks/useEmailVerification";
import { RegistrationService } from "../services/registrationService";

export default function UserRegistration() {
  const [registrationStep, setRegistrationStep] = useState("form");
  const { verificationState, sendVerification, checkVerification, isVerified } =
    useEmailVerification();

  const formik = useFormik({
    initialValues: initialFormValues,
    validate: registrationValidation,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!isVerified) {
          alert("Please verify your email first!");
          return;
        }

        await RegistrationService.submitRegistration(
          values,
          verificationState.user
        );
        setRegistrationStep("complete");
      } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSendVerification = async () => {
    if (!formik.values.email || !formik.values.password) {
      alert("Please enter email and password first!");
      return;
    }

    const result = await sendVerification(
      formik.values.email,
      formik.values.password
    );
    if (result.success) {
      alert("Verification email sent! Please check your inbox.");
    } else {
      alert(result.error?.message || "Failed to send verification email");
    }
  };

  const handleCheckVerification = async () => {
    const result = await checkVerification();
    if (result.success && result.verified) {
      alert("Email verified successfully!");
    } else if (result.success && !result.verified) {
      alert("Email not verified yet. Please check your inbox.");
    } else {
      alert("Error checking verification status.");
    }
  };

  if (registrationStep === "complete") {
    return <h1>success</h1>;
  }

  return (
    <div className="registration-container">
      <RegistrationForm
        formik={formik}
        verificationState={verificationState}
        onSendVerification={handleSendVerification}
        onCheckVerification={handleCheckVerification}
        isVerified={isVerified}
      />
    </div>
  );
}
