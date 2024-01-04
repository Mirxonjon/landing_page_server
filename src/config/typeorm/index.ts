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
dotenv.config();

export const connectDb: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  password: String(process.env.DB_PASSWORD),
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  entities: [ AdminEntity , ApplicationEntity , HeaderImageEntity , PartnerEntity , ShortHistoryEntity ,StatisticEntity , ServiseEntity,FrendlyTeamEntity ],
  autoLoadEntities: true,
  synchronize: true,
};
