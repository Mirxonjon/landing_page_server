import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { SingInUserDto } from './dto/sign_in-user.dto';
import { AdminEntity } from 'src/entities/admin.entity';

@Injectable()
export class AuthServise {
  constructor(private readonly jwtServise: JwtService) {}
  // async createUser(createUser: CreateUserDto) {
  //   const findUser = await UsersEntity.findOne({
  //     where: {
  //       email: createUser.gmail,
  //       phone: createUser.number,
  //     },
  //   }).catch((e) => {
  //     throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
  //   });

  //   if (findUser) {
  //     throw new HttpException(
  //       'Gmail or Number already registered',
  //       HttpStatus.FOUND,
  //     );
  //   }

  //   const addedUser = await UsersEntity.createQueryBuilder()
  //     .insert()
  //     .into(UsersEntity)
  //     .values({
  //       name: createUser.name,
  //       surname: createUser.surname,
  //       phone: createUser.number,
  //       email: createUser.gmail,
  //       password: createUser.password,
  //       was_born_date: createUser.was_born,
  //     })
  //     .returning(['id', 'role'])
  //     .execute()
  //     .catch((e) => {
  //       throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
  //     });

  //   return {
  //     message: 'You have successfully registered',
  //     token: this.sign(addedUser.raw.at(-1).id, addedUser.raw.at(-1).role),
  //   };
  // }
  async signIn(signInDto: SingInUserDto) {
    const finduser = await AdminEntity.findOne({
      where: {
        name: signInDto.name,
        password: signInDto.password,
      },
    }).catch((e) => {
      throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
    });

    if (!finduser) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'successfully sing In',
      token: this.sign(finduser.id, finduser.password),
    };
  }

  sign(id: string, password: string) {
    return this.jwtServise.sign({ id, password });
  }

  async verify(token: string) {
    try {
      const verifytoken = await this.jwtServise
        .verifyAsync(token)
        .catch((e) => {
          throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        });
      return verifytoken;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
