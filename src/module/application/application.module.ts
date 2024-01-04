import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationServise } from './application.service';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationServise],
})
export class ApplicationModule {}
