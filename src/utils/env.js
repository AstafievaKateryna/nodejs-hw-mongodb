import dotenv from 'dotenv';
dotenv.config();

export const env = (name, defaultValue) => {
  const value = process.env[name];
  console.log(value);

  if (value) return value;
  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}']`);
};
