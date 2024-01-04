import { Module } from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticServise } from './statistic.service';
import { AuthServise } from '../auth/auth.service';

@Module({
  controllers: [StatisticController],
  providers: [StatisticServise],
})
export class StatisticModule {}
