type RatingDescription = 'not too bad but could be better' | 'too bad' | 'very good'

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: RatingDescription,
  target: number,
  average: number
}

const calculateExercises = (exerciceHours: Array<number>, target: number): Result => {
  const periodLength: number = exerciceHours.length

  const trainingDays: number = exerciceHours
    .filter((day: number) => day !== 0).length

  const average: number = exerciceHours
    .reduce((a: number, b: number): number => a + b, 0) / exerciceHours.length

  const success: boolean = average > target

  let rating: number = 2
  if (average > target) {
    rating = 3
  }
  if (average < (target / 2)) {
    rating = 1
  }

  let ratingDescription: RatingDescription = 'not too bad but could be better'
  if (rating === 1) {
    ratingDescription = 'too bad'
  }
  if (rating === 3) {
    ratingDescription = 'very good'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))