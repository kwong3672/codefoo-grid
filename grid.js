var gridArea = 0;
var gridHeight = 0;
var gridWidth = 0;
var validAnswers = {};

// create user defined m X n grid
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

var addChain = function (row, column, chainSum, chain) {
  // create key using row and column as coordinates
  var key = '' + row + column;
  // define default values if parameter values not provided
  row = row || 0;
  column = column || 0;
  chainSum = chainSum || grid[row][column];
  chain = chain || {};

  // check if sum of chain is <= to grid area
  if (chainSum <= gridArea) {
    chain[key] = grid[row][column];

    // check if sum of chain is equal to the grid area
    if (chainSum === gridArea) {
      // create sorted key using coordinate of keys in answer
      var sortedAnswerKey = Object.keys(chain).sort();
      // check if answer is long enough (width - 1)
      if (sortedAnswerKey.length >= gridWidth - 1) {
        // add to validAnswers
        validAnswers[sortedAnswerKey] = chain;
      }
    }

    // check all adjacent cells
    // check above
    checkAdjacent(row - 1, column, chain, Object.assign({}, chain));
    // check diagonal above and right
    checkAdjacent(row - 1, column + 1, chainSum, Object.assign({}, chain));
    // check right
    checkAdjacent(row, column + 1, chainSum, Object.assign({}, chain));
    // check diagonal below and right
    checkAdjacent(row + 1, column + 1, chainSum, Object.assign({}, chain));
    // // check below
    checkAdjacent(row + 1, column, chainSum, Object.assign({}, chain));
    // check diagonal below and left
    checkAdjacent(row + 1, column - 1, chainSum, Object.assign({}, chain));
    // check left
    checkAdjacent(row, column - 1, chainSum, Object.assign({}, chain));
    // check diagonal above and left
    checkAdjacent(row - 1, column - 1, chainSum, Object.assign({}, chain));
  
  } else {
    // if sum of chain greater than area end function
    return;
  }
};

var checkAdjacent = function (row, column, chainSum, chain) {
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
  // run addChain function to add valid cell to chain
  addChain(row, column, chainSum, Object.assign({}, chain));

};

var validCoordinate = function (row, column) {
  var valid = true;
  if (row < 0 || row >= gridHeight || column < 0 || column >= gridWidth) {
    valid = false;
  }
  return valid;
};

var coordinateUsed = function (row, column, chain) {
  var unused = true;
  var key = '' + row + column;
  // if value in object equal to value in cell, the cell has been used
  if (chain[key] === grid[row][column]) {
    unused = false;
  }
  return unused;
};


var grid = makeGrid(3, 3);
grid.forEach(function(row) {
  console.log(row);
});

grid.forEach(function(row, rowIdx, array) {
  row.forEach(function(column, colIdx, array2) {
    addChain(rowIdx, colIdx);
  });
});

console.log('The valid answers are :');
console.log(validAnswers);
console.log('Total # of valid answers : ', Object.keys(validAnswers).length);
