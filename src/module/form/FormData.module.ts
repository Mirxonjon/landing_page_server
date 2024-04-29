import { Module } from '@nestjs/common';
import { FormDataController } from './FormData.controller';
import { FormDataServise } from './FormData.service';


@Module({
  controllers: [FormDataController],
  providers: [FormDataServise],
})
export class FormDataModule {}
