import { Module } from '@nestjs/common';
import { ServiseController } from './servise.controller';
import { ServiseMoreServise } from './servise.service';
import { AuthServise } from '../auth/auth.service';

@Module({
  controllers: [ServiseController],
  providers: [ServiseMoreServise ,AuthServise],
})
export class ServiseModule {}
