import capitalize from './capitalize';

test('capitalize brice to match Brice', () => {
  expect(capitalize('brice')).toMatch('Brice');
});

test('capitalize moket to match Moket', () => {
  expect(capitalize('moket')).toMatch('Moket');
});

test('capitalize silidje to match Silidje', () => {
  expect(capitalize('silidje')).toMatch('Silidje');
});
