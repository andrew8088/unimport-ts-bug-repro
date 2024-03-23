export {}
declare global {
  const B: typeof import('@disco/common')['B']
  const E: typeof import('@disco/common')['E']
  const ParentError: typeof import('@disco/common')['ParentError']
  const createErrorClass: typeof import('@disco/common')['createErrorClass']
  const deferred: typeof import('@disco/common')['deferred']
  const fn: typeof import('@disco/common')['fn']
  const nameFn: typeof import('@disco/common')['nameFn']
  const noop: typeof import('@disco/common')['noop']
  const pipe: typeof import('@disco/common')['pipe']
  const pipeAsync: typeof import('@disco/common')['pipeAsync']
  const z: typeof import('zod')['z']
}