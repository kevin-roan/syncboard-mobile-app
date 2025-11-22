import { validateEmail } from '@/utils/validateEmail';

describe('validate email address', () => {
  test('check random email', () => {
    expect(validateEmail('kevinroan@gmail.com')).toBe(true);
  });
  test('test invalid email', () => {
    expect(validateEmail('kevinroan@.com')).toBe(false);
  });
  test('test cryptic but valid email', () => {
    expect(validateEmail('mail.kevinroan@gmail.com')).toBe(true);
  });
  test('test escape characters in the email', () => {
    expect(validateEmail('"kevinroan"@gmail.com')).toBe(true);
  });

  test('empty string', () => {
    expect(validateEmail('')).toBe(false);
  });
  test('null', () => {
    expect(validateEmail(null)).toBe(false);
  });
  test('undefined', () => {
    expect(validateEmail(undefined)).toBe(false);
  });

  test('missing @', () => {
    expect(validateEmail('kevinroan.gmail.com')).toBe(false);
  });

  test('multiple @', () => {
    expect(validateEmail('kevin@roan@gmail.com')).toBe(false);
  });

  test('spaces inside email', () => {
    expect(validateEmail('kevin roan@gmail.com')).toBe(false);
  });

  test('leading or trailing spaces', () => {
    expect(validateEmail('  kevin@gmail.com')).toBe(false);
    expect(validateEmail('kevin@gmail.com  ')).toBe(false);
  });

  test('very long email but valid', () => {
    const email = 'a'.repeat(30) + '@gmail.com';
    expect(validateEmail(email)).toBe(true);
  });
});
