import express from 'express';
import { bmiCalculator } from './bmiModule';

const app = express();

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
  const height = request.query.height ? +request.query.height : 0
  const weight = request.query.weight ? +request.query.weight : 0

  if (!height || typeof(height) !== 'number' || !weight || typeof(weight) !== 'number') {
    response.status(400).send({
      error: "malformatted parameters"
    })
  } else {
    response.send(bmiCalculator(height, weight));
  };
});

const PORT = 3003;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));