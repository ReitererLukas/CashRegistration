import { prisma } from '@/prisma/Prisma';
import { hashPwd } from '@/util/authentication';
import { faker } from '@faker-js/faker';


const currencies: any[] = [];
const entries: any[] = [];
const users: any[] = []
const categories: any[] = []
const entryMembers: any[] = []

async function testData() {

  categories.push({ value: "etc" });
  categories.push({ value: "car" });
  categories.push({ value: "food" });

  currencies.push({ name: "Euro", symbol: "€" });
  currencies.push({ name: "Kuna", symbol: "kn" });
  currencies.push({ name: "Dollar", symbol: "$" });

  entries.push({ userid: 1, amount: 5.5, currencyName: "Kuna", categoryId: 1 });
  entries.push({ userid: 3, amount: 1.0, currencyName: "Euro", categoryId: 2 });
  entries.push({ userid: 2, amount: 3.0, currencyName: "Kuna", categoryId: 3 });
  entries.push({ userid: 1, amount: 10.0, currencyName: "Euro", categoryId: 3 });
  entries.push({ userid: 5, amount: 1000.0, currencyName: "Kuna", categoryId: 3 });
  entries.push({ userid: 2, amount: 500.0, currencyName: "Euro", categoryId: 2 });
  entries.push({ userid: 5, amount: 99.99, currencyName: "Dollar", categoryId: 2 });
  entries.push({ userid: 1, amount: 45.0, currencyName: "Kuna", categoryId: 1 });
  entries.push({ userid: 3, amount: 1.0, currencyName: "Kuna", categoryId: 3 });
  entries.push({ userid: 3, amount: 10.0, currencyName: "Euro", categoryId: 1 });

  entryMembers.push({ entryId: 1, userId: 2 });
  entryMembers.push({ entryId: 2, userId: 4 });
  entryMembers.push({ entryId: 3, userId: 3 });
  entryMembers.push({ entryId: 4, userId: 5 });
  entryMembers.push({ entryId: 5, userId: 1 });
  entryMembers.push({ entryId: 6, userId: 5 });
  entryMembers.push({ entryId: 7, userId: 1 });
  entryMembers.push({ entryId: 8, userId: 2 });
  entryMembers.push({ entryId: 9, userId: 5 });
  entryMembers.push({ entryId: 10, userId: 4 });

  users.push({ email: 'user1@mail.at', firstname: faker.name.firstName(), lastname: faker.name.lastName(), password: await hashPwd("IamUser1!"), isAdmin: true })
  users.push({ email: 'user2@mail.at', firstname: faker.name.firstName(), lastname: faker.name.lastName(), password: await hashPwd("IamUser2!") })
  users.push({ email: 'user3@mail.at', firstname: faker.name.firstName(), lastname: faker.name.lastName(), password: await hashPwd("IamUser3!") })
  users.push({ email: 'user4@mail.at', firstname: faker.name.firstName(), lastname: faker.name.lastName(), password: await hashPwd("IamUser4!") })
  users.push({ email: 'user5@mail.at', firstname: faker.name.firstName(), lastname: faker.name.lastName(), password: await hashPwd("IamUser5!") })
}

async function seed() {
  console.log("Create Testdata");
  console.log("-------------------");
  await testData();

  await prisma.entryMember.deleteMany();
  await prisma.entry.deleteMany();
  await prisma.currency.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();

  await prisma.category.createMany({
    data: categories
  });

  await prisma.user.createMany({
    data: users
  });

  await prisma.currency.createMany({
    data: currencies
  });

  await prisma.entry.createMany({
    data: entries
  });

  await prisma.entryMember.createMany({
    data: entryMembers
  });

}

seed()