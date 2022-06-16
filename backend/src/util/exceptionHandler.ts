import { NextFunction, Request, Response, Router } from "express";
import { BaseException } from "@/util/Exceptions/BaseException";

async function catchBlock(controller: Function, req: Request, resp: Response, next: NextFunction) {
  try {
    await controller(req, resp, next);
  } catch (error) {
    next(error);
  }
}

function ehGet(router: Router, path: string, controller: Function, middleware: any = null) {
  const fn = (req: Request, resp: Response, next: NextFunction) => catchBlock(controller, req, resp, next);
  if(middleware != null) {
    router.get(path, middleware, fn);
  } else {
    router.get(path, fn);
  }
}

function ehDelete(router: Router, path: string, controller: Function) {
  router.delete(path, (req: Request, resp: Response, next: NextFunction) => catchBlock(controller, req, resp, next));
}

function ehPost(router: Router, path: string, controller: Function, middleware: any = null) {
  const fn = (req: Request, resp: Response, next: NextFunction) => catchBlock(controller, req, resp, next);
  if(middleware != null) {
    router.post(path, middleware, fn);
  } else {
    router.post(path, fn);
  }
}

function ehPut(router: Router, path: string, controller: Function) {
  router.put(path, (req: Request, resp: Response, next: NextFunction) => catchBlock(controller, req, resp, next));
}

function ehPatch(router: Router, path: string, controller: Function) {
  router.patch(path, (req: Request, resp: Response, next: NextFunction) => catchBlock(controller, req, resp, next));
}

function exceptionHandler(err: Error, req: Request, resp: Response, next: NextFunction) {
  if (err instanceof BaseException) {
    resp.status(err.responseCode()).json({ message: err.message });
  } else {
    next(err);
  }
}

function defaultExceptionHandler(err: Error, req: Request, resp: Response, next: NextFunction) {
  console.error(err.stack);
  resp.status(500).json({ message: err.message })
}

export { ehGet, ehDelete, ehPatch, ehPost, ehPut, exceptionHandler, defaultExceptionHandler };
