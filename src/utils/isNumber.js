const isNumber = num => {
  return !isNaN(parseFloat(num)) && !isNaN(num - 0);
};


module.exports = isNumber;
