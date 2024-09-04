const validateName = (name) => {
  if (!name) {
    return "Name is required.";
  }

  const nameRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;

  if (!nameRegex.test(name)) {
    return "Name can only contain letters and spaces.";
  }

  if (name.length < 2) {
    return "Name must be at least 2 characters long.";
  }

  if (name.length > 50) {
    return "Name must be no more than 50 characters long.";
  }

  return "";
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePasswordField = (password, fieldName, isRequired = false) => {
  if (isRequired && !password) {
    return `${fieldName} is required`;
  }

  if (password && password.length < 8) {
    return "Password must be at least 8 characters long";
  }

  if (password && password.length > 64) {
    return "Password must be no more than 64 characters long";
  }

  return "";
};

const validatePasswordMatch = (newPassword, repeatPassword) => {
  if (!newPassword || !repeatPassword) {
    return "";
  }

  if (newPassword !== repeatPassword) {
    return "Passwords do not match";
  }

  return "";
};

export {
  validateName,
  validateEmail,
  validatePasswordField,
  validatePasswordMatch,
};
