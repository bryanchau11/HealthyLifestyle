const { calculateBmi, calculateBfp } = require('./Calculate');

const data = { height: 68, weight: 190 };

test('Calculate BMI', () => {
  expect(calculateBmi(data)).toBe('28.89');
});

test('Calculate Bfp', () => {
  expect(calculateBfp(20, calculateBmi(data), 'M')).toBe(23.068);
});
