import { Request, Response, NextFunction } from 'express'
import { service } from '@/services/UserService'

async function login(req: Request, resp: Response, next: NextFunction) {
  const token: object = await service.login(req.body.email, req.body.pwd);
  resp.json(token);
  next();
}

async function signup(req: Request, resp: Response, next: NextFunction) {
  const token: object = await service.signup(req.body.email, req.body.firstname, req.body.lastname, req.body.pwd);
  resp.json(token);
  next();
}

async function getUsers(req: Request, resp: Response, next: NextFunction) {
  const users: [] = await service.getUsers(req.body.auth);
  resp.json(users);
  next();
}

export const controller = { login, signup, getUsers }