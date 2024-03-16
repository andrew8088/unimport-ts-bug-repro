import { deferred } from "@disco/common";
import { UturnParseError } from "./errors";
import type { Req, Res } from "./uturn";

export function parseUrl<T>(req: Req, _res: Res, ctx: T) {
  if (!req.url) {
    throw new UturnParseError("request has no url", req);
  }

  return {
    ...ctx,
    url: new URL(req.url, `http://${req.headers.host}`),
  };
}

const READ_METHODS = ["GET", "HEAD", "OPTIONS"] as const;
type ReadMethod = (typeof READ_METHODS)[number];
const WRITE_METHODS = ["POST", "PUT", "PATCH", "DELETE"] as const;
type WriteMethod = (typeof WRITE_METHODS)[number];
type SupportedMethod = ReadMethod | WriteMethod;

function isSupportedMethod(method: string): method is SupportedMethod {
  return READ_METHODS.includes(method as ReadMethod) || WRITE_METHODS.includes(method as WriteMethod);
}

function isWriteMethod(method: SupportedMethod): method is WriteMethod {
  return WRITE_METHODS.includes(method as WriteMethod);
}

type WithoutBody<T> = T extends T ? { method: T } : never;
type WithBody<T> = T extends T ? { method: T; body: string } : never;
type ParseBodyContext<T> = T & (WithoutBody<ReadMethod> | WithBody<WriteMethod>);

export function parseMethodAndBody<T>(req: Req, _res: Res, ctx: T): Promise<ParseBodyContext<T>> {
  const { promise, resolve } = deferred<ParseBodyContext<T>>();

  const { method } = req;

  if (!method) {
    throw new UturnParseError("request has no method", req);
  }

  if (!isSupportedMethod(method)) {
    throw new UturnParseError(`request has unsupported method: ${req.method}`, req);
  }

  if (!isWriteMethod(method)) {
    resolve({ ...ctx, method });
  } else {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => resolve({ ...ctx, method, body }));
  }
  return promise;
}