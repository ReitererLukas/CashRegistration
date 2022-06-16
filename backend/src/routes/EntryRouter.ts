import express, { Router } from 'express'
import { controller } from '@/controller/EntryController';
import { ehGet, ehPost } from '@/util/exceptionHandler';
import { authenticateUser } from '@/middleware/authentication';

const router: Router = express.Router();

ehGet(router, "/", controller.getAllEntries);

ehGet(router, "/currencies", controller.getCurrencies);

ehPost(router, "/addEntry", controller.addEntry, authenticateUser);

ehGet(router, "/categories", controller.getCategories);

export default router;