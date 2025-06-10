// services/registrationService.js
export class RegistrationService {
  static async submitRegistration(userData, firebaseUser) {
    const payload = this.formatUserData(userData, firebaseUser);

    const response = await fetch(
      "http://localhost:8000/api/patients/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await firebaseUser.getIdToken()}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    return await response.json();
  }

  static formatUserData(formData, firebaseUser) {
    return {
      email: firebaseUser.email,
      emailVerified: firebaseUser.isVerified,
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobNum: Number(formData.mobNum),
      dob: new Date(formData.dob),
      gender: formData.gender,
      medicationAllergies: [formData.medicationAllergies],
      foodAllergies: [formData.foodAllergies],
      environmentalAllergies: [formData.environmentalAllergies],
      chronicConditions: formData.chronicConditions,
      currentMedications: formData.currentMedications,
      consentEHR: formData.consentEHR,
      consentReminders: formData.consentReminders,
      address: formData.address,
      pinCode: formData.pinCode,
    };
  }
}
