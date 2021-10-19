import { PrismaClient } from '@prisma/client';

class ProfileService {
  public profiles = new PrismaClient().profile;
}

export default ProfileService;
