import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminEntity } from 'src/entities/admin.entity';
import { CustomRequest } from 'src/types';

export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
      PassReqToCallback: true,
      pass: true,
    });
  }

  async validate(req: CustomRequest, payload: any) {

    const findAdmin = await AdminEntity.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!findAdmin) {
      throw new HttpException('You  are not admin', HttpStatus.NOT_FOUND);
    }

    return '1';
  }
}
