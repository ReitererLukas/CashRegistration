import jwt from "jsonwebtoken";
import exc from "@/util/Exceptions";
import bcrypt from "bcrypt";
import { secrets } from "@/util/secrets"

async function hashPwd(plain: string): Promise<string> {
  let hashed: string = await bcrypt.hash(plain, 10);
  return hashed;
}

async function comparePwd(plain: string, hashed: string): Promise<boolean> {
  return await bcrypt.compare(plain, hashed);
}

function createJwt(userid: number, isAdmin: boolean): string {
  // expires in 20 minutes
  return jwt.sign({ userid: userid, admin: isAdmin}, secrets.token_secret, { expiresIn: 60 * 20 });
}

function verifyJwt(token: string): any {
  return jwt.verify(token, secrets.token_secret, (err, user) => {
    if (err) {
      throw new exc.InvalidTokenException();
    }

    return user;
  });
}

export { hashPwd, createJwt, verifyJwt, comparePwd };

