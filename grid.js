const createGrid = require('./createGrid.js');
const coordinateUsed = require('./coordinateUsed.js');
const validCoordinate = require('./validCoordinate.js');
const { height, width, area } = require('./gridVariables.js');

console.log('grid.js: ', height)

var gridArea = 9;
var gridHeight = 3;
var gridWidth = 3;
var validAnswers = {};

// function that create a chain of cells and checks if the value inside adds up to a valid answer
var createChain = function (row, column, chainSum, chain) {
  // create key using row and column as coordinates
  var key = '' + row + column;
  // define default values if parameter values not provided
  row = row || 0;
  column = column || 0;
  chainSum = chainSum || grid[row][column];
  chain = chain || {};

  if (chainSum <= gridArea) {
    chain[key] = grid[row][column];

    // check if sum of chain is equal to the grid area 
    if (chainSum === gridArea) {
      // create sorted key using coordinates of the valid answer
      var sortedAnswerKey = Object.keys(chain).sort();
      // check if answer is long enough (width - 1) add to valid answers
      if (sortedAnswerKey.length >= gridWidth - 1) {
        validAnswers[sortedAnswerKey] = chain;
      }
    }

    // checkAdjacent(row, column, chainSum, chain);
    checkCoordinate(grid, row - 1, column, chain, Object.assign({}, chain));
    // check diagonal above and right
    checkCoordinate(grid, row - 1, column + 1, chainSum, Object.assign({}, chain));
    // check right
    checkCoordinate(grid, row, column + 1, chainSum, Object.assign({}, chain));
    // check diagonal below and right
    checkCoordinate(grid, row + 1, column + 1, chainSum, Object.assign({}, chain));
    // // check below
    checkCoordinate(grid, row + 1, column, chainSum, Object.assign({}, chain));
    // check diagonal below and left
    checkCoordinate(grid, row + 1, column - 1, chainSum, Object.assign({}, chain));
    // check left
    checkCoordinate(grid, row, column - 1, chainSum, Object.assign({}, chain));
    // check diagonal above and left
    checkCoordinate(grid, row - 1, column - 1, chainSum, Object.assign({}, chain));
  }
};

// function that checks if the coordinate is valid, unused and less than the area
var checkCoordinate = function (grid, row, column, chainSum, chain) {
  // check if cell is valid coordinate if not valid stop
  if (!validCoordinate(row, column)) {
    return;
  }

  // check if cell has been used in current chain if used stop
  if (!coordinateUsed(grid, row, column, chain)) {
    return;
  }

  // add value in current cell to chainSum
  chainSum = chainSum + grid[row][column];
  // run createChain function to add valid cell to chain
  if (chainSum > gridArea) {
    return;
  }

  createChain(row, column, chainSum, Object.assign({}, chain));
};

// create and display grid change parameters to increase grid size
var grid = createGrid(width, height);
grid.forEach(function(row) {
  console.log(row);
});

// create chain starting at each cell of grid
grid.forEach(function(row, rowIdx, array) {
  row.forEach(function(column, colIdx, array2) {
    createChain(rowIdx, colIdx);
  });
});

// display answers
console.log('The valid answers are :');
for (var keys in validAnswers) {
  console.log(validAnswers[keys]);
}
console.log('Total # of valid answers : ', Object.keys(validAnswers).length);

module.exports = {
  height: 3
};

