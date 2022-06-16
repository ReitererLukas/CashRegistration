import { service } from '@/services/EntryService';
import { NextFunction, Request, Response } from 'express';


async function getAllEntries(req: Request, resp: Response, next: NextFunction) {
  resp.json(await service.getAllEntries());
  next();
}

async function getCurrencies(req: Request, resp: Response, next: NextFunction) {
  resp.json(await service.getCurrencies());
  next();
}

async function addEntry(req: Request, resp: Response, next: NextFunction) {
  let entryId: number = await service.addEntry(req.body.entry, req.body.auth);
  resp.set("location", String(entryId));

  let entry = await service.getEntryById(entryId); 
  resp.json(entry);
  resp.end()
  next();
}

async function getCategories(req: Request, resp: Response, next: NextFunction) {
  let cats = await service.getCategories();
  resp.json(cats);
  next();
}

export const controller = { getAllEntries, getCurrencies, addEntry, getCategories }