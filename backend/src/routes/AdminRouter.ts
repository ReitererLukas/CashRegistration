import express, { Router } from 'express'
import { controller } from '@/controller/AdminController';
import { ehPost } from '@/util/exceptionHandler';
import { authenticateAdmin } from '@/middleware/authentication';

const router: Router = express.Router();

ehPost(router, "/addCategory", controller.addCategory, authenticateAdmin);

ehPost(router, "/addCurrency", controller.addCurrency, authenticateAdmin);

export default router;