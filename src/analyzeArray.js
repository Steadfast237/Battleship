function analyzeArray(arr) {
  return {
    average:
      arr.reduce((acc, cur) => {
        return (acc += cur);
      }, 0) / arr.length,
    min: Math.min(...arr),
    max: Math.max(...arr),
    length: arr.length,
  };
}

export default analyzeArray;
