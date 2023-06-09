export default function uniqueArray(array: Array<number>) {
  return array.filter((value, index, array) => array.indexOf(value) === index);
}
