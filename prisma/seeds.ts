import { Account, PrismaClient } from '@prisma/client';
import faker from 'faker';
const prisma = new PrismaClient();

(async function main() {
  for (let i = 0; i < 10; i++) {
    const email = faker.internet.email();
    const password = faker.internet.password();

    await prisma.account.create({
      data: {
        email,
        password,
        profile: {
          create: {}
        }
      }
    });
  }

  for (let j = 0; j < 50; j++) {
    const result = await prisma.$queryRaw<Account[]>`SELECT * FROM "Account" ORDER BY random() LIMIT 2`;
    await prisma.interaction.create({
      data: {
        menteeId: result[0].id,
        mentorId: result[1].id
      }
    });
  }

  await prisma.$disconnect();
})();
