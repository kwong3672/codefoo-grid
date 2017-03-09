var gridArea = 0;
var gridHeight = 0;
var gridWidth = 0;

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
        // add to validanswers
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
  
};


makeGrid(3, 3);
