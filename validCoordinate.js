// function to check if coordinate being check is a valid cell location
const { height, width, area } = require('./gridVariables.js');

module.exports = (row, column) => {
  let valid = true;
  if (row < 0 || row >= height || column < 0 || column >= width) {
    valid = false;
  }
  return valid;
};