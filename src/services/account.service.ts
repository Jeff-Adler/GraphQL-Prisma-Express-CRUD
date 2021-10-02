import { Account, PrismaClient } from '@prisma/client';

class AccountService {
  public accounts = new PrismaClient().account;

  public async findAllUser(): Promise<Account[]> {
    const allAccounts: Account[] = await this.accounts.findMany();
    return allAccounts;
  }
}

export default AccountService;
