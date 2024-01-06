export default function isALanguageIn(input, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].name === input.name) {
      return true;
    }
  }
  return false;
}