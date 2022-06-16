import { prisma } from '@/prisma/Prisma';
import exc from '@/util/Exceptions';

async function getAllEntries() {
  return await prisma.entry.findMany({
    select: {
      amount: true,
      lastUpdate: true,
      user: {
        select: {
          firstname: true,
          lastname: true
        }
      },
      currency: true,
      category: {
        select: {
          value: true,
        }
      }
    }
  });
}

async function getCurrencies() {
  return await prisma.currency.findMany();
}

async function addEntry(entry: any, userid: number): Promise<number> {
  // entries.push({ entryId: 1, userid: 1, amount: 5.5, currencyName: "Kuna" });
  if (entry.amount <= 0) {
    throw new exc.NegativeAmountException();
  }

  const { amount, currencyName, category } = entry;
  const { users } = entry;

  // create entry
  const e = await prisma.entry.create({
    data: {
      userid: userid,
      amount: amount,
      currencyName: currencyName,
      categoryId: category
    }
  });

  // add other members of the payment
  for (let user of users) {
    await prisma.entryMember.create({
      data: {
        entryId: e.entryId,
        userId: user
      }
    });
  }
  return e.entryId;
}

async function getEntryById(entryId: number): Promise<any> {
  return await prisma.entry.findUnique({
    select: {
      amount: true,
      lastUpdate: true,
      user: {
        select: {
          firstname: true,
          lastname: true
        }
      },
      currency: true,
      category: {
        select: {
          value: true,
        }
      }
    },
    where: {
      entryId: entryId
    }
  })
}

async function getCategories(): Promise<any> {
  return await prisma.category.findMany({
    select: {
      categoryId: true,
      value: true,
    },
  })
}

export const service = { getAllEntries, getCurrencies, addEntry, getEntryById, getCategories };