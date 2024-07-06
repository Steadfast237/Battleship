import caesarCipher from './caesarCipher';

test('encrypt xyz to match abc', () => {
  expect(caesarCipher('xyz', 3)).toMatch('abc');
});

test('maintain case sensitive', () => {
  expect(caesarCipher('HeLLo', 3)).toMatch('KhOOr');
});

test('maintain punctuations and spaces', () => {
  expect(caesarCipher('Hello, World!', 3)).toMatch('Khoor, Zruog!');
});
