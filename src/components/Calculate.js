/* eslint-disable prefer-destructuring */
function calculateBmi(data) {
  if (data.weight && data.height) {
    const height = data.height;
    const weight = data.weight;
    const BMI = (weight / (height * height)) * 703;
    return BMI.toFixed(2);
  }
  return null;
}

function calculateBfp(age, bmi, gender) {
  if (age && bmi && gender) {
    if (gender === 'F') {
      return 1.2 * bmi + 0.23 * age - 5.4;
    }
    if (gender === 'M') {
      return 1.2 * bmi + 0.23 * age - 16.2;
    }
  }
  return null;
}

module.exports = { calculateBmi, calculateBfp };
