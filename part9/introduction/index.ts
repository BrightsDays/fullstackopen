/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { bmiCalculator } from './modules/bmiModule';
import { exerciseCalculator } from './modules/exerciseModule';

const app = express();
app.use(express.urlencoded());

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
  const height = request.query.height ? +request.query.height : 0;
  const weight = request.query.weight ? +request.query.weight : 0;

  if (!height || !weight) {
    response.status(400).send({
      error: "parameters missing"
    });
  } else if (typeof(height) !== 'number' || typeof(weight) !== 'number') {
    response.status(400).send({
      error: "malformatted parameters"
    });
  } else {
    response.send(bmiCalculator(height, weight));
  }
});

app.get('/exercises', (_request, response) => {
  response.send(
    `<form method="POST" action="/exercises">
      <input type="text" name="target" placeholder="2">
      <input type="text" name="exercises" placeholder="1 2 3 4 5">
      <input type="submit">
    </form>`
  );
});

app.post('/exercises', (request, response) => {
  let badExercisesList = false;
  const target: number = request.body.target ? +request.body.target : 0;
  const exercises: string = request.body.exercises;
  const exercisesList: Array<number> = [];
  
  if (exercises && typeof(exercises) === 'string') {
    exercises.split(' ').forEach(item => {
      if (typeof(parseInt(item)) !== 'number' || isNaN(+item)) badExercisesList = true;
      exercisesList.push(+item);
    });
  }
  
  if (!exercisesList.length || (!target && !isNaN(target))) {
    response.status(400).send({
      error: "parameters missing"
    });
  } else if (badExercisesList || isNaN(target)) {
    response.status(400).send({
      error: "malformatted parameters"
    });
  } else {
    response.send(exerciseCalculator(exercisesList, target));
  }
});

const PORT = 3003;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));