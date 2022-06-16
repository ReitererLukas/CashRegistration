import express, { Router } from 'express'
import { controller } from '@/controller/UserController';
import { ehGet, ehPost } from '@/util/exceptionHandler';
import { authenticateUser } from '@/middleware/authentication';

const router: Router = express.Router();

ehPost(router, "/login", controller.login);

ehPost(router, "/signup",controller.signup);

ehGet(router, "/getUsers",controller.getUsers, authenticateUser);

export default router;