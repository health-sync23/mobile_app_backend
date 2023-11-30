function runEmailValidation(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const correctEmailFormat = emailRegex.test(email);

  if (!correctEmailFormat) {
    return false;
  }

  return correctEmailFormat;
}

function runPasswordValidation(password) {
  // at least 5 characters long
  const passwordRegex = /^[A-Za-z\d!@#$%^&*()_+]{5,}$/;

  return passwordRegex.test(password);
}

module.exports = {
  runPasswordValidation,
  runEmailValidation,
};
