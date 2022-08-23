type Rating = 'not too bad but could be better' | 'too bad' | 'very good';

interface CalculatedExercises {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: Rating;
  target: number;
  average: number;
}

const calculateExercises = (exerciceHours: Array<number>, target: number): CalculatedExercises => {
  const periodLength: number = exerciceHours.length;

  const trainingDays: number = exerciceHours
    .filter((day: number) => day !== 0).length;

    console.log(exerciceHours);
    
  const average: number = exerciceHours
    .reduce((a: number, b: number): number => a + b, 0) / exerciceHours.length;

  const success: boolean = average > target;

  let rating = 2;
  if (average > target) {
    rating = 3;
  }
  if (average < (target / 2)) {
    rating = 1;
  }

  let ratingDescription: Rating = 'not too bad but could be better';
  if (rating === 1) {
    ratingDescription = 'too bad';
  }
  if (rating === 3) {
    ratingDescription = 'very good';
  }

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

export { calculateExercises as exerciseCalculator };