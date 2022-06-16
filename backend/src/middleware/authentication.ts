import { verifyJwt } from "@/util/authentication";
import { NextFunction, Request, Response } from "express";

function authenticateUser(req: Request, resp: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const user = verifyJwt(token);
    req.body.auth = user.userid;
    next();
  } else {
    resp.sendStatus(401);
  }
}

export { authenticateUser }