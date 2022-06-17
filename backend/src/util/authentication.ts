import jwt from "jsonwebtoken";
import exc from "@/util/Exceptions";
import bcrypt from "bcrypt";

async function hashPwd(plain: string): Promise<string> {
  let hashed: string = await bcrypt.hash(plain, 10);
  return hashed;
}

async function comparePwd(plain: string, hashed: string): Promise<boolean> {
  return await bcrypt.compare(plain, hashed);
}

const secret: string = "HalloSecret1234!"
function createJwt(userid: number, isAdmin: boolean): string {
  // expires in 20 minutes
  return jwt.sign({ userid: userid, admin: isAdmin}, secret, { expiresIn: 60 * 20 });
}

function verifyJwt(token: string): any {
  return jwt.verify(token, secret, (err, user) => {
    if (err) {
      throw new exc.InvalidTokenException();
    }

    return user;
  });
}

export { hashPwd, createJwt, verifyJwt, comparePwd };

