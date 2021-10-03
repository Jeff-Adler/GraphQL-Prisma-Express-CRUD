import { resolve } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: resolve(__dirname, `./envs/.env.${process.env.ENVIRONMENT}`) });
import App from '@/src/app';
import { PrismaClient } from '@prisma/client';

const app = new App();

app.listen();

const prisma = new PrismaClient();

(async function main() {
  const result = await prisma.account.findMany();
  console.log(result.length);
  await prisma.$disconnect();
})();
