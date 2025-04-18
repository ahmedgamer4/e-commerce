import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import 'passport-local';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
