import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './types/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import refreshConfig from './config/refresh.config';
import { ConfigType } from '@nestjs/config';
import { CreateUserDto } from '@/users/dtos/create-user.dto';
import { SelectUser } from '@/db/schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
  ) {}

  async validateLocalUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found!');
    const passwordMatched = await verify(user.passwordHash, password);
    if (!passwordMatched)
      throw new UnauthorizedException('Invalid credentials');

    return {
      id: user.id,
      name: user.name,
    };
  }

  async login(userId: number, name: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    const hashedRT = await hash(refreshToken);
    await this.usersService.updateHashedRefreshToken(userId, hashedRT);

    return {
      id: userId,
      name: name,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(userId: number) {
    const payload: JwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async registerUser(dto: CreateUserDto) {
    const exists = await this.usersService.findByEmail(dto.email);
    if (exists) throw new ConflictException('Email already exists');
    return this.usersService.create(dto);
  }

  async validateJwtUser(userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new UnauthorizedException('User not found!');

    const currentUser = {
      id: user.id,
      name: user.name,
    };
    return currentUser;
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user: SelectUser | undefined =
      await this.usersService.findOne(userId);

    if (!user) throw new UnauthorizedException('User not found!');

    if (!refreshToken || !user.hashedRefreshToken)
      throw new UnauthorizedException('Invalid refresh token!');

    const refreshTokenMatched = await verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!refreshTokenMatched)
      throw new UnauthorizedException('Invalid refresh token!');

    const currentUser = {
      id: user.id,
      name: user.name,
    };
    return currentUser;
  }

  async refreshToken(userId: number, name: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);

    const hashedRT = await hash(refreshToken);
    await this.usersService.updateHashedRefreshToken(userId, hashedRT);

    return {
      id: userId,
      name: name,
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: number) {
    return await this.usersService.updateHashedRefreshToken(userId, null);
  }
}
