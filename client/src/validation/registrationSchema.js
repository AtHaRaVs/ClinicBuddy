// validation/registrationSchema.js
export const registrationValidation = (values) => {
  const errors = {};

  // Name validations
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

  // Email validation
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // Other validations...
  if (!values.dob) errors.dob = "Required";
  if (!values.gender) errors.gender = "Required";
  if (!values.medicationAllergies) errors.medicationAllergies = "Required";
  if (!values.foodAllergies) errors.foodAllergies = "Required";
  if (!values.environmentalAllergies)
    errors.environmentalAllergies = "Required";

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

export const initialFormValues = {
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
};
