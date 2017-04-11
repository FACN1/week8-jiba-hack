module.exports = (date) => {
  if (date) {
    return date.toDateString();
  }
  return new Error('No date supplied to formatDate.js');
};
