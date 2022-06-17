import { prisma } from '@/prisma/Prisma';

async function addCategory(description: string) {
  await prisma.category.create({
    data: {
      value: description
    }
  });
}

async function addCurrency(name: string, symbol: string) {
  await prisma.currency.create({
    data: {
      name: name,
      symbol: symbol
    }
  });
}

export const service = { addCategory, addCurrency };