import { Module } from '@nestjs/common';
import { PartnerController } from './partner.controller';
import { PartnerServise } from './partner.service';


@Module({
  controllers: [PartnerController],
  providers: [PartnerServise],
})
export class PartnerModule {}
