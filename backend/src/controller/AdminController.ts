import { service } from '@/services/AdminService';
import { NextFunction, Request, Response } from 'express';


async function addCurrency(req: Request, resp: Response, next: NextFunction) {
  await service.addCurrency(req.body.name, req.body.symbol);
  resp.end();
  next();
}

async function addCategory(req: Request, resp: Response, next: NextFunction) {
  await service.addCategory(req.body.description);
  resp.end();
  next();
}

export const controller = { addCurrency, addCategory }