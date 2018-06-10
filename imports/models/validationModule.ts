/**
 * Created by rejhan on 2.12.2017.
 */

// Custom validators will go here
//
//  Reusable RegExps
export const regExps: { [key: string]: RegExp } = {
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
};

// Reusable error messages
export const errorMessages: { [key: string]: string } = {
  name: 'Full name must be between 1 and 128 characters',
  email: 'Email must be a valid email address (username@domain)',
  password: 'Password must be between 7 and 15 characters, and contain at least one number and special character',
  description: 'Passwords must match'
};
