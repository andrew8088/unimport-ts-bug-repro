# Unimport TypeScript Bug

## Description

There seems to be a bug in the exports auto scan when scanning a TypeScript package in the same monorepo: the generic arguments of exported function are being exported on their own, and then failing to resolve during build.

## To Reproduce

- clone [this repro repo](https://github.com/andrew8088/unimport-ts-bug-repro)
- `pnpm i`
- `cd packages/app`
- If you want to regenerate the type definition file:
    - `rm unimport.d.ts`
    - `pnpm dev`
    - kill the dev server
- Now, `pnpm build`
    - you should see several (4) `Property '...' does not exist on type ...` errors from `tsc`.
    - if you compare `packages/common/index.ts` and the generated packages/app/unimport.d.ts` files, you'll see 4 extra exports in the `unimport.d.ts` file, all of which correspond to generic type argument or function arguments.
