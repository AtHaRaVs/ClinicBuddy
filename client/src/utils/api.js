import { getIdToken } from "firebase/auth";
import { auth } from "../firebase.config";

export const makeAuthenticatedRequest = async (url, options = {}) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const token = await getIdToken(user, true);

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Authentication request failed:", error);
    throw error;
  }
};

export const getVerificationButtonText = (verificationStatus) => {
  switch (verificationStatus) {
    case "sending":
      return "Sending Email...";
    case "sent":
      return "Check Verification Status";
    case "checking":
      return "Checking...";
    case "verified":
      return "✓ Email Verified";
    default:
      return "Send Verification Email";
  }
};
