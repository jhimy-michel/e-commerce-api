import {HttpErrors} from '@loopback/rest';
import PasswordValidator from 'password-validator';
import bcrypt from 'bcrypt';

export async function ValidatePassword(password: string): Promise<string> {
  const schema = new PasswordValidator();
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(['Passw0rd', 'Password123']);

  if (!schema.validate(password)) {
    throw new HttpErrors[422]('Password is too weak');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  return hashPassword;
}
