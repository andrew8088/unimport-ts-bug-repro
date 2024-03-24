export default function main() {
  const arr1 = function1(1, 2);
  const arr2 = function2(3, 4);
  const v = function3(5);
  return arr1.concat(arr2).reduce((a, n) => a + n, v);
}
