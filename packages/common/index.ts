export function function1<A, B = string>(a: A, b: B) {
  return [a, b];
}

export function function2<C, D>(c: C, d: D) {
  return [c, d];
}

export function function3<E>(e: E, f: E) {
  return [e, f];
}

type F = number;

export function function4(g: F, h: F) {
  return [g, h];
}
