import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { hash } from 'argon2';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  async create(dto: CreateUserDto) {
    const { password } = dto;
    try {
      const passwordHash = await hash(password);
      await db.insert(users).values({ ...dto, passwordHash });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to hash password: ${error}`,
      );
    }
  }

  async findOne(id: number) {
    try {
      return await db.query.users.findFirst({ where: eq(users.id, id) });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to find user ${error}`);
    }
  }

  async findByEmail(email: string) {
    try {
      return await db.query.users.findFirst({ where: eq(users.email, email) });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to find user ${error}`);
    }
  }

  async updateHashedRefreshToken(userId: number, hashedRT: string | null) {
    try {
      await db
        .update(users)
        .set({ hashedRefreshToken: hashedRT })
        .where(eq(users.id, userId));
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update user ${error}`);
    }
  }
}
