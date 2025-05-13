export function validateEmail(email: string): string | null {
  const trimmedEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email !== trimmedEmail) {
    return 'Email must not contain leading or trailing spaces.';
  }

  if (!emailRegex.test(trimmedEmail)) {
    return 'Please enter a valid email address (e.g., user@example.com).';
  }

  return null;
}

export function validatePassword(password: string): string | null {
  const trimmedPassword = password.trim();

  if (password !== trimmedPassword) {
    return 'Password must not contain leading or trailing spaces.';
  }

  if (trimmedPassword.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  if (!/[A-Z]/.test(trimmedPassword)) {
    return 'Password must contain at least one uppercase letter (A-Z).';
  }

  if (!/[a-z]/.test(trimmedPassword)) {
    return 'Password must contain at least one lowercase letter (a-z).';
  }

  if (!/[0-9]/.test(trimmedPassword)) {
    return 'Password must contain at least one digit (0-9).';
  }

  if (!/[!@#$%^&*]/.test(trimmedPassword)) {
    return 'Password must contain at least one special character (!@#$%^&*).';
  }

  return null;
}
