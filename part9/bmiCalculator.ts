interface BmiValues {
  height: number;
  weight: number;
};

const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  };
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / Math.pow(height, 2)) * 10000

  if (bmi < 16) {
    return('Underweight (Severe thinness)');
  }
  if (bmi >= 16 && bmi < 17) {
    return('Underweight (Moderate thinness)');
  }
  if (bmi >= 17 && bmi < 18.5) {
    return('Underweight (Mild thinness)');
  }
  if (bmi >= 18.5 && bmi < 25) {
    return('Normal (healthy weight)');
  }
  if (bmi >= 25 && bmi < 30) {
    return('Overweight (Pre-obese)');
  }
  if (bmi >= 30 && bmi < 35) {
    return('Obese (Class I)');
  }
  if (bmi >= 35 && bmi < 40) {
    return('Obese (Class II)');
  }
  if (bmi >= 40) {
    return('Obese (Class III)');
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}