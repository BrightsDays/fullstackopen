interface CalculatedBmi {
  height: number;
  weight: number;
  result: string;
};

const calculateBmi = (height: number, weight: number): CalculatedBmi => {
  const bmi = (weight / Math.pow(height, 2)) * 10000
  let result = ''

  if (bmi < 16) {
    result = 'Underweight (Severe thinness)';
  }
  if (bmi >= 16 && bmi < 17) {
    result = 'Underweight (Moderate thinness)';
  }
  if (bmi >= 17 && bmi < 18.5) {
    result = 'Underweight (Mild thinness)';
  }
  if (bmi >= 18.5 && bmi < 25) {
    result = 'Normal (healthy weight)';
  }
  if (bmi >= 25 && bmi < 30) {
    result = 'Overweight (Pre-obese)';
  }
  if (bmi >= 30 && bmi < 35) {
    result = 'Obese (Class I)';
  }
  if (bmi >= 35 && bmi < 40) {
    result = 'Obese (Class II)';
  }
  if (bmi >= 40) {
    result = 'Obese (Class III)';
  }

  return({
    height,
    weight,
    result
  })
};

export { calculateBmi as bmiCalculator };