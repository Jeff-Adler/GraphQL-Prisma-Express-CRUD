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
          create: []
        }
      }
    });
  }

  for (let j = 0; j < 50; j++) {
    const result: Account[] = await prisma.$queryRaw`SELECT * FROM accounts ORDER BY random() LIMIT 2`;
    await prisma.interaction.create({
      data: {
        mentee: { connect: result[0] },
        mentor: { connect: result[1] }
      }
    });
  }

  await prisma.$disconnect();
})();
