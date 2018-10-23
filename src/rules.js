export function isText(value) {
  if (toString.call(value) == "[object String]") return null;
  return "Please enter text.";
}

export function isNumber(value) {
  if (!isNaN(parseFloat(value)) && isFinite(value)) return null;
  return "Please enter a number.";
}
