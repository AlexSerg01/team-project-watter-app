const validatePasswordMatch = (newPassword, configPassword) => {
  if (!newPassword || !configPassword) {
    return "Please enter both passwords";
  }

  if (newPassword !== configPassword) {
    return "Passwords do not match";
  }

  if (newPassword.length < 8) {
    return "Password must be at least 8 characters long";
  }

  if (newPassword.length > 64) {
    return "Password must be no more than 64 characters long";
  }

  return "";
};

export default validatePasswordMatch;
