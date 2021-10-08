import { HttpException } from '@exceptions/HttpException';
import { Interaction, PrismaClient } from '@prisma/client';

class InteractionService {
  public interactions = new PrismaClient().interaction;

  public async findAllInteractions(): Promise<Interaction[]> {
    const allInteractions: Interaction[] = await this.interactions.findMany();

    if (!allInteractions.length) {
      throw new HttpException(404, `No interations found`);
    }

    return allInteractions;
  }

  public findInteractionById = async (menteeId: number, mentorId: number): Promise<Interaction> => {
    const interaction: Interaction | null = await this.interactions.findUnique({
      where: {
        menteeId_mentorId: {
          menteeId,
          mentorId
        }
      }
    });

    if (!interaction) {
      throw new HttpException(404, `Interaction not found`);
    }

    return interaction;
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

export default InteractionService;
