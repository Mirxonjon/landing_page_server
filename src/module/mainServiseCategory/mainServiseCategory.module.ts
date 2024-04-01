import { Module } from '@nestjs/common';
import { mainServiseCategoryController } from './mainServiseCategory.controller';
import { mainServiseCategoryServise } from './mainServiseCategory.service';


@Module({
  controllers: [mainServiseCategoryController],
  providers: [mainServiseCategoryServise],
})
export class PartnerModule {}
