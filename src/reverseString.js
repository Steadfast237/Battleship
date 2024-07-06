function reverseString(_string) {
  const reversed = [];
  _string.split('').forEach((char) => reversed.unshift(char));

  return reversed.join('');
}

export default reverseString;
