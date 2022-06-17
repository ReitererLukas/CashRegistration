import { prisma } from '@/prisma/Prisma';
import { comparePwd, createJwt, hashPwd } from '@/util/authentication';
import exc from '@/util/Exceptions';
import { secrets } from "@/util/secrets";

async function signup(email: string, firstname: string, lastname: string, pwd: string): Promise<object> {
  if (!secrets.mails.includes(email) && secrets.stage == "PROD") {
    throw new exc.InvalidEmailException();
  }

  const userMail = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (userMail) {
    throw new exc.UserExistsException("Mail is already registered");
  }

  const user = await prisma.user.create({
    data: {
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: await hashPwd(pwd),
    }
  });

  return { token: createJwt(user.userid, user.isAdmin), isAdmin: user.isAdmin };
}


async function login(email: string, pwd: string): Promise<object> {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (!user || !(await comparePwd(pwd, user.password))) {
    throw new exc.CredentialsInvalidException();
  }

  return { token: createJwt(user!.userid, user!.isAdmin), isAdmin: user.isAdmin };
}


async function getUsers(userid: number): Promise<any> {
  return await prisma.user.findMany({
    select: {
      userid: true,
      firstname: true,
      lastname: true,
    },
    where: {
      NOT: {
        userid: userid
      }
    }
  });
}

export const service = { signup, login, getUsers };