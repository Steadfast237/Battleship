function caesarCipher(_string, shift) {
  const alphabets = 'abcdefghijklmnopqrstuvwxyz';
  const length = alphabets.length;

  return _string
    .split('')
    .map((char) => {
      const charIndex = alphabets.indexOf(char.toLowerCase());

      if (charIndex < 0) return char;

      const computedIndex = charIndex + shift;
      const newIndex =
        computedIndex >= length ? computedIndex - length : computedIndex;

      if (char !== alphabets[charIndex]) {
        return alphabets[newIndex].toUpperCase();
      }

      return alphabets[newIndex];
    })
    .join('');
}

export default caesarCipher;
