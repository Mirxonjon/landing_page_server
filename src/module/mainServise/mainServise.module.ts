import { Module } from '@nestjs/common';
import { MainServiseController } from './mainServise.controller';
import { MainServiseServise } from './mainServise.service';


@Module({
  controllers: [MainServiseController],
  providers: [MainServiseServise],
})
export class MainServiseModule {}
