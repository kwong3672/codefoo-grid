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

makeGrid(3, 3);
