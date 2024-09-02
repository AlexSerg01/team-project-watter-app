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

export default validateName;
