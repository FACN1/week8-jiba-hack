module.exports = (input) => {
  if (input) {
    return input.toUpperCase();
  }
  return new Error('No input supplied to upperCase.js');
};
