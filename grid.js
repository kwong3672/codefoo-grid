var gridArea = 0;
var gridHeight = 0;
var gridWidth = 0;
var validAnswers = {};

// function that creates a user defined m X n grid
var makeGrid = function (width, height) {
  gridHeight = height;
  gridWidth = width;
  gridArea = gridWidth * gridHeight;

  // create array to store grid
  var grid = [];
  // create array for each row of grid
  for (var i = 0; i < gridHeight; i++) {
    var row = [];
    // create random num (0-9) for each column in row
    for (var j = 0; j < gridWidth; j++) {
      row.push(Math.floor(Math.random() * 10));
    }
    grid.push(row);
  }
  return grid;
};

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
    checkCoordinate(row - 1, column, chain, Object.assign({}, chain));
    // check diagonal above and right
    checkCoordinate(row - 1, column + 1, chainSum, Object.assign({}, chain));
    // check right
    checkCoordinate(row, column + 1, chainSum, Object.assign({}, chain));
    // check diagonal below and right
    checkCoordinate(row + 1, column + 1, chainSum, Object.assign({}, chain));
    // // check below
    checkCoordinate(row + 1, column, chainSum, Object.assign({}, chain));
    // check diagonal below and left
    checkCoordinate(row + 1, column - 1, chainSum, Object.assign({}, chain));
    // check left
    checkCoordinate(row, column - 1, chainSum, Object.assign({}, chain));
    // check diagonal above and left
    checkCoordinate(row - 1, column - 1, chainSum, Object.assign({}, chain));
  }
};

// function that checks if the coordinate is valid, unused and less than the area
var checkCoordinate = function (row, column, chainSum, chain) {
  // check if cell is valid coordinate if not valid stop
  if (!validCoordinate(row, column)) {
    return;
  }

  // check if cell has been used in current chain if used stop
  if (!coordinateUsed(row, column, chain)) {
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

// function to check if coordinate being check is a valid cell location
var validCoordinate = function (row, column) {
  var valid = true;
  if (row < 0 || row >= gridHeight || column < 0 || column >= gridWidth) {
    valid = false;
  }
  return valid;
};

// function that checks to see if current coordinate has already been used in current chain
var coordinateUsed = function (row, column, chain) {
  var unused = true;
  var key = '' + row + column;
  // if value in object equal to value in cell, the cell has been used
  if (chain[key] === grid[row][column]) {
    unused = false;
  }
  return unused;
};

// create and display grid change parameters to increase grid size
var grid = makeGrid(3, 3);
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
