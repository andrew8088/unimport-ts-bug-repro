# Unimport TypeScript Bug

## Description

There seems to be a bug in the exports auto scan when scanning a TypeScript package in the same monorepo: function arguments and their types are being treated as their own exports, and then (correctly) failing to resolve during build.

## Steps To Reproduce

- clone [this repro repo](https://github.com/andrew8088/unimport-ts-bug-repro)
- `pnpm i`
- `cd packages/app`
- If you want to regenerate the type definition file:
    - `rm unimport.d.ts`
    - `pnpm dev`
    - kill the dev server
- Now, `pnpm build`
    - you should see several `Property '...' does not exist on type ...` errors from `tsc`.

## Details

The package we're auto-importing has these three functions:

```ts
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
```

The generated `unimport.d.ts` file looks like this:

```ts
export {}
declare global {
  const B: typeof import('common')['B']
  const D: typeof import('common')['D']
  const b: typeof import('common')['b']
  const d: typeof import('common')['d']
  const f: typeof import('common')['f']
  const function1: typeof import('common')['function1']
  const function2: typeof import('common')['function2']
  const function3: typeof import('common')['function3']
  const function4: typeof import('common')['function4']
  const h: typeof import('common')['h']
}
```

All the exports that are not `function*` are not actually exported from the package.
I thought this might have something to do with generic arguments, but the `function4` example seems to rule that out.
However, it looks like there might be a bug in the logic that parses the package to find all the exports.
Something to do with the second argument to a function, maybe?
