export function validateSignup({ name, email, address, password }) {
  const errors = {};
  if (!name || name.length < 20 || name.length > 60) errors.name = 'Name must be 20-60 chars';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = 'Invalid email';
  if (address && address.length > 400) errors.address = 'Address too long';
  if (!password || password.length < 8 || password.length > 16 || !/[A-Z]/.test(password) || !/[^A-Za-z0-9]/.test(password)) errors.password = 'Password requirements not met';
  return errors;
}
