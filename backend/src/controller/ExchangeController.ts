import { service } from '@/services/ExchangeService';
import { NextFunction, Request, Response } from 'express';


async function addExchange(req: Request, resp: Response, next: NextFunction) {
  let id = await service.addExchange(req.body.auth, req.body.exchange);

  resp.set("location", String(id));

  let exchange = await service.getExchangeById(id);
  resp.json(exchange);
  next();
}

async function getExchanges(req: Request, resp: Response, next: NextFunction) {
  const exchanges: any = await service.getExchanges(req.body.auth);
  resp.json(exchanges);
  next();
}

export const controller = { addExchange, getExchanges }