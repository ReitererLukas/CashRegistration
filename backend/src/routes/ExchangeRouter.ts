import express, { Router } from 'express'
import { controller } from '@/controller/ExchangeController';
import { ehGet, ehPost } from '@/util/exceptionHandler';
import { authenticateUser } from '@/middleware/authentication';

const router: Router = express.Router();

ehPost(router, "/add", controller.addExchange, authenticateUser);

ehGet(router, "/getAll", controller.getExchanges, authenticateUser);

export default router;