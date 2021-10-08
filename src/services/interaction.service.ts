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

  public createInteraction = async (menteeId: number, mentorId: number): Promise<Interaction> => {
    const interaction: Interaction = await this.interactions.create({
      data: {
        menteeId,
        mentorId
      }
    });

    if (!interaction) {
      throw new HttpException(404, `Error creating interaction`);
    }

    return interaction;
  };
}

export default InteractionService;
