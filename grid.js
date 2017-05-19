const createGrid = require('./createGrid.js');
const createChain = require('./createChain.js');
const { height, width, validAnswers } = require('./gridVariables.js');


// create and display grid change parameters to increase grid size
const grid = createGrid(width, height);
grid.forEach(function(row) {
  console.log(row);
});

// create chain starting at each cell of grid
grid.forEach(function(row, rowIdx, array) {
  row.forEach(function(column, colIdx, array2) {
    createChain(grid, rowIdx, colIdx);
  });
});

// display answers
console.log('The valid answers are :');
for (let keys in validAnswers) {
  console.log(validAnswers[keys]);
}
console.log('Total # of valid answers : ', Object.keys(validAnswers).length);
