import { Module } from '@nestjs/common';
import { PartnerCommentController } from './partnerComment.controller';
import { PartnerCommentServise } from './partnerComment.service';


@Module({
  controllers: [PartnerCommentController],
  providers: [PartnerCommentServise],
})
export class PartnerCommentModule {}
