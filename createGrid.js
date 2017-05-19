// function that creates a user defined m X n grid
module.exports = (width, height) => {
  // create array to store grid
  const grid = [];
  // create array for each row of grid
  for (let i = 0; i < height; i++) {
    const row = [];
    // create random num (0-9) for each column in row
    for (let j = 0; j < width; j++) {
      row.push(Math.floor(Math.random() * 10));
    }
    grid.push(row);
  }
  return grid;
};
