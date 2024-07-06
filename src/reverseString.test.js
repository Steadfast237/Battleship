import reverseString from './reverseString';

test('reverse brice to match ecirb', () => {
  expect(reverseString('brice')).toMatch('ecirb');
});

test('reverse moulet to match teluom', () => {
  expect(reverseString('moulet')).toMatch('teluom');
});
