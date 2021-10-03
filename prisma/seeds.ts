import { Account, PrismaClient } from '@prisma/client';
import faker from 'faker';
const prisma = new PrismaClient();

(async function main() {
  for (let i = 0; i < 10; i++) {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const account = await prisma.account.create({
      data: {
        email,
        password,
        profile: {
          create: {}
        }
      }
    });
    console.log('Account created: ' + JSON.stringify(account));
  }

  for (let j = 0; j < 50; j++) {
    const result = await prisma.$queryRaw<Account[]>`SELECT * FROM "Account" ORDER BY random() LIMIT 2`;

    const interaction = await prisma.interaction.upsert({
      where: {
        menteeId_mentorId: {
          menteeId: result[0].id,
          mentorId: result[1].id
        }
      },
      update: {},
      create: {
        menteeId: result[0].id,
        mentorId: result[1].id
      }
    });

    console.log('Interaction created: ' + JSON.stringify(interaction));
  }

  await prisma.$disconnect();
})();
