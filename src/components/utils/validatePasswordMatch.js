const validatePasswordMatch = (newPassword, configPassword) => {
  // Перевірка, чи заповнені обидва поля
  if (!newPassword || !configPassword) {
    return 'Please enter both passwords'
  }

  // Перевірка, чи паролі збігаються
  if (newPassword !== configPassword) {
    return 'Passwords do not match'
  }

  // Перевірка довжини паролю
  if (newPassword.length < 8) {
    return 'Password must be at least 8 characters long'
  }

  if (newPassword.length > 64) {
    return 'Password must be no more than 64 characters long'
  }

  return ''
}

export default validatePasswordMatch
