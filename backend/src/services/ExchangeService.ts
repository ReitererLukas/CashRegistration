import { prisma } from '@/prisma/Prisma';
import exc from '@/util/Exceptions';

async function addExchange(userid: number, exchange: any) {
  if (exchange.amountTo <= 0 || exchange.amountFrom <= 0) {
    throw new exc.NegativeAmountException();
  }

  exchange = await prisma.exchange.create({
    data: {
      userId: userid,
      amountFrom: exchange.amountFrom,
      currencyNameFrom: exchange.currencyNameFrom,
      amountTo: exchange.amountTo,
      currencyNameTo: exchange.currencyNameTo,
    }
  });

  return exchange.exchangeId
}

async function getExchanges(userid: number): Promise<any> {

  return await prisma.exchange.findMany({
    select: {
      amountFrom: true,
      currencyFrom: true,
      amountTo: true,
      currencyTo: true
    },
    where: {
      userId: userid
    }
  });
}

async function getExchangeById(id: number): Promise<any> {

  return await prisma.exchange.findUnique({
    where: {
      exchangeId: id,
    }
  });
}

export const service = { addExchange, getExchanges, getExchangeById };