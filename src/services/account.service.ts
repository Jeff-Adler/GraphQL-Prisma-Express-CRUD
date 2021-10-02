import { HttpException } from '@exceptions/HttpException';
import { Account, PrismaClient } from '@prisma/client';

class AccountService {
  public accounts = new PrismaClient().account;

  public async findAllAccounts(): Promise<Account[]> {
    const allAccounts: Account[] = await this.accounts.findMany();

    if (!allAccounts.length) {
      throw new HttpException(404, `No accounts found`);
    }

    return allAccounts;
  }

  public findAccountById = async (id: number): Promise<Account> => {
    const account: Account | null = await this.accounts.findUnique({
      where: {
        id
      }
    });

    if (!account) {
      throw new HttpException(404, `Account of id ${id} not found`);
    }

    return account;
  };

  public findAccountByEmail = async (email: string): Promise<Account> => {
    const account: Account | null = await this.accounts.findUnique({
      where: {
        email
      }
    });

    if (!account) {
      throw new HttpException(404, `Account of email ${email} not found`);
    }

    return account;
  };

  public createAccount = async (email: string, password: string): Promise<Account> => {
    const account: Account = await this.accounts.create({
      data: {
        email,
        password
      }
    });

    if (!account) {
      throw new HttpException(404, `Error creating account`);
    }

    return account;
  };
}

export default AccountService;
