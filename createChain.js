const { area, width, validAnswers } = require('./gridVariables.js');
const validCoordinate = require('./validCoordinate.js');
const coordinateUsed = require('./coordinateUsed.js');


// function that create a chain of cells and checks if the value inside adds up to a valid answer
const createChain = (grid, row, column, chainSum, chain) => {
  // define default values if parameter values not provided
  row = row || 0;
  column = column || 0;
  chainSum = chainSum || 0;
  chain = chain || {};

  //exit out of function if invalid coordinate or coordinate already used in chain
  if (!validCoordinate(row, column) || coordinateUsed(grid, row, column, chain)) {
    return;
  }

  // create key using row and column as coordinates
  const key = '' + row + column;
  // add value of current cell to chainSum
  chainSum += grid[row][column];

  if (chainSum <= area) {
    chain[key] = grid[row][column];

    // check if sum of chain is equal to the grid area 
    if (chainSum === area) {
      // create sorted key using coordinates of the valid answer
      const sortedAnswerKey = Object.keys(chain).sort();
      // check if answer is long enough (width - 1) add to valid answers
      if (sortedAnswerKey.length >= width - 1) {
        validAnswers[sortedAnswerKey] = chain;
      }
    }

    // checkAdjacent(row, column, chainSum, chain);
    createChain(grid, row - 1, column, chainSum, Object.assign({}, chain));
    // check diagonal above and right
    createChain(grid, row - 1, column + 1, chainSum, Object.assign({}, chain));
    // check right
    createChain(grid, row, column + 1, chainSum, Object.assign({}, chain));
    // check diagonal below and right
    createChain(grid, row + 1, column + 1, chainSum, Object.assign({}, chain));
    // // check below
    createChain(grid, row + 1, column, chainSum, Object.assign({}, chain));
    // check diagonal below and left
    createChain(grid, row + 1, column - 1, chainSum, Object.assign({}, chain));
    // check left
    createChain(grid, row, column - 1, chainSum, Object.assign({}, chain));
    // check diagonal above and left
    createChain(grid, row - 1, column - 1, chainSum, Object.assign({}, chain));
  }
};

module.exports = createChain;
