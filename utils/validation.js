function runEmailValidation(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const correctEmailFormat = emailRegex.test(email);

  if (!correctEmailFormat) {
    return false;
  }

  return correctEmailFormat;
}

function runPasswordValidation(password) {
  // Password must be at least 8 characters long and contain at least one uppercase letter.
  const passwordRegex = /^(?=.*[A-Z])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  return passwordRegex.test(password);
}

console.log(runPasswordValidation("Barnachea56"));

module.exports = {
  runPasswordValidation,
  runEmailValidation,
};
