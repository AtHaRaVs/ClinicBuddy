// hooks/useEmailVerification.js
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase.config";

export const useEmailVerification = () => {
  const [verificationState, setVerificationState] = useState({
    status: "idle", // 'idle', 'sending', 'sent', 'checking', 'verified'
    user: null,
    resendCountdown: 0,
    originalEmail: "",
  });

  const updateState = (updates) => {
    setVerificationState((prev) => ({ ...prev, ...updates }));
  };

  const sendVerification = async (email, password) => {
    updateState({ status: "sending" });

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);

      updateState({
        status: "sent",
        user,
        originalEmail: email,
        resendCountdown: 60,
      });

      return { success: true, user };
    } catch (error) {
      updateState({ status: "idle" });
      return { success: false, error };
    }
  };

  const checkVerification = async () => {
    if (!verificationState.user) return { success: false };

    updateState({ status: "checking" });

    try {
      await verificationState.user.reload();

      if (verificationState.user.emailVerified) {
        updateState({ status: "verified" });
        return { success: true, verified: true };
      } else {
        updateState({ status: "sent" });
        return { success: true, verified: false };
      }
    } catch (error) {
      updateState({ status: "sent" });
      return { success: false, error };
    }
  };

  const resendVerification = async () => {
    if (!verificationState.user || verificationState.resendCountdown > 0)
      return;

    try {
      await sendEmailVerification(verificationState.user);
      updateState({ resendCountdown: 60 });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (verificationState.resendCountdown > 0) {
      timer = setTimeout(() => {
        updateState({ resendCountdown: verificationState.resendCountdown - 1 });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [verificationState.resendCountdown]);

  return {
    verificationState,
    sendVerification,
    checkVerification,
    resendVerification,
    isVerified: verificationState.status === "verified",
    isInProgress: ["sending", "checking"].includes(verificationState.status),
  };
};
