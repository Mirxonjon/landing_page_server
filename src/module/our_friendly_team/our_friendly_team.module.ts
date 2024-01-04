import { Module } from '@nestjs/common';
import { FrendlyTeamController } from './our_friendly_team.controller';
import { FrendlyTeamServise } from './our_friendly_team.service';

@Module({
  controllers: [FrendlyTeamController],
  providers: [FrendlyTeamServise],
})
export class FrendlyTeamModule {}
