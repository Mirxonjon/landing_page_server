import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { connectDb } from './config/typeorm';
import { ShortHistoryModule } from './module/short_history/short_history.module';
import { AuthModule } from './module/auth/auth.module';
import { HeaderImageModule } from './module/header_Image/header_image.module';
import { StatisticModule } from './module/statistic/statistic.module';
import { ApplicationModule } from './module/application/application.module';
import { ServiseModule } from './module/servise_more/servise.module';
import { FrendlyTeamModule } from './module/our_friendly_team/our_friendly_team.module';
import { PartnerModule } from './module/partner/partner.module';
import { PartnerCommentModule } from './module/partnerComment/partnerComment.module';
import { mainServiseCategoryModule } from './module/mainServiseCategory/mainServiseCategory.module';
import { MainServiseModule } from './module/mainServise/mainServise.module';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRoot(connectDb),
    AuthModule,
    ShortHistoryModule,
    HeaderImageModule,
    StatisticModule,
    ApplicationModule,
    ServiseModule,
    FrendlyTeamModule,
    PartnerModule,
    PartnerCommentModule,
    MainServiseModule,
    mainServiseCategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
