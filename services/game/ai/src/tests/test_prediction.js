import { predictBallPosition } from '../physics.js';

const testCases = [
  [[5.855, 2.451], [0.581, 1.862]],
  [[-0.239, 3.973], [2.436, -0.568]],
  [[6.658, -2.675], [-1.064, 1.023]],
  [[2.012, -2.37], [-1.12, 0.919]],
  [[6.78, 1.748], [1.62, -0.585]],
  [[-3.125, 1.334], [-2.433, -0.092]],
  [[6.21, -2.275], [-0.687, 1.36]],
  [[3.574, 2.708], [-1.724, 1.312]],
  [[-2.837, 2.188], [-0.882, 0.27]],
  [[-4.444, 4.442], [0.682, 1.973]],
  [[6.376, 4.731], [0.718, 0.205]],
  [[3.512, 0.451], [-2.428, 0.413]],
  [[1.489, -0.523], [1.134, -1.032]],
  [[-5.374, 3.054], [-1.726, 0.627]],
  [[-0.399, -3.897], [-2.254, 1.694]]
];

for (let i = 0; i < testCases.length; i++) {
  const [ballPos, ballVel] = testCases[i];
  const [predictedPos, predictedVel] = predictBallPosition(ballPos, ballVel);
  console.log(
    `Test ${i + 1}:\n` +
    `  Ball Pos: ${ballPos}, Ball Vel: ${ballVel}\n` +
    `  → Predicted Pos: ${predictedPos}, Predicted Vel: ${predictedVel}\n`
  );
}
