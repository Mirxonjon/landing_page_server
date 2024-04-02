import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AdminEntity } from 'src/entities/admin.entity';
import { ApplicationEntity } from 'src/entities/application.entity';
import { HeaderImageEntity } from 'src/entities/headerImage.entity';
import { PartnerEntity } from 'src/entities/partner.entity';
import { ShortHistoryEntity } from 'src/entities/short_history.entity';
import { StatisticEntity } from 'src/entities/statistic.entity';
import { ServiseEntity } from 'src/entities/servise.entity';
import { FrendlyTeamEntity } from 'src/entities/our_friendly_team_imeges.entity';
import { PartnerCommentEntity } from 'src/entities/parnerComment.entity';
import { MainServiseCategoryEntity } from 'src/entities/mainServiseCategory.entity';
import { MainServiseEntity } from 'src/entities/mainServise.entity';
dotenv.config();

export const connectDb: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  password: String(process.env.DB_PASSWORD),
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  entities: [ AdminEntity , ApplicationEntity , HeaderImageEntity ,PartnerCommentEntity , PartnerEntity , ShortHistoryEntity ,StatisticEntity , ServiseEntity,FrendlyTeamEntity ,MainServiseCategoryEntity,MainServiseEntity ],
  autoLoadEntities: true,
  synchronize: true,
};
