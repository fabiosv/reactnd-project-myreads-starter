
export default function camelCaseToPhrase(text) {
  const words = text.match(new RegExp("(?:[A-Z][a-z]+)|^([^A-Z]+)", 'g'));
  const words_capitalized = words.map((word) => (word.replace(/^./, (m) => { return m.toUpperCase()})));
  return words_capitalized.join(' ');
}