type RatingDescription = 'not too bad but could be better' | 'too bad' | 'very good';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  days: number[];
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  
  if (args.filter(arg => isNaN(Number(arg))).length === 2) {
    let exerciceDays = []
    for (let i = 3; i < args.length; i++) {
      exerciceDays.push(args[i])
    }
    
    return {
      target: Number(args[3]),
      days: exerciceDays
    };
  } else {
    throw new Error('Provided values were not numbers!');
  };
};

const calculateExercises = (exerciceHours: Array<number>, target: number): Result => {
  const periodLength: number = exerciceHours.length;

  const trainingDays: number = exerciceHours
    .filter((day: number) => day !== 0).length;

  const average: number = exerciceHours
    .reduce((a: number, b: number): number => a + b, 0) / exerciceHours.length;

  const success: boolean = average > target;

  let rating: number = 2;
  if (average > target) {
    rating = 3;
  };
  if (average < (target / 2)) {
    rating = 1;
  };

  let ratingDescription: RatingDescription = 'not too bad but could be better';
  if (rating === 1) {
    ratingDescription = 'too bad';
  };
  if (rating === 3) {
    ratingDescription = 'very good';
  };

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { target, days } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}