import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create_statistic.dto';
import { UpdateStatisticDto } from './dto/update_statistic.dto';
import { StatisticEntity } from 'src/entities/statistic.entity';

@Injectable()
export class StatisticServise {

  async findOne(id: string ) {
    const findStatistic = await StatisticEntity.findOneBy({ id }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    if (!findStatistic) {
      throw new HttpException('Statistic not found', HttpStatus.NOT_FOUND);
    }
  return findStatistic
  }

  

  async findAll() {
    const findStatistic = await StatisticEntity.find({
      order:{
        create_data :'desc'
      }
    });

    if (!findStatistic) {
      throw new HttpException('Statistic not found', HttpStatus.NOT_FOUND);
    }

    return findStatistic;
  }

  async create(
    body: CreateStatisticDto ,
  ) {

        await StatisticEntity.createQueryBuilder()
          .insert()
          .into(StatisticEntity)
          .values({
            title: body.title,
            title_ru: body.title_ru,
            title_en: body.title_en,
            statistic : body.statistic
          })
          .execute()
          .catch((e) => { 
            throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
          });

  }

  async update(
    id: string,
    body: UpdateStatisticDto ,
  ) {
    const findStatistic = await StatisticEntity.findOne({
      where: { id },
    });

    if (!findStatistic) {
      throw new HttpException('Statistic not found', HttpStatus.NOT_FOUND);
    }

   
        const updated = await StatisticEntity.update(id, {
          title: body.title || findStatistic.title,
          title_ru : body.title_ru || findStatistic.title_ru,
          title_en : body.title_en || findStatistic.title_en,
          statistic : body.statistic || findStatistic.title
        });

        return updated;
    
  }

  async remove(id: string) {
    const findStatistic = await StatisticEntity.findOneBy({ id }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findStatistic) {
      throw new HttpException('Statistik not found', HttpStatus.NOT_FOUND);
    }

    await StatisticEntity.delete({ id });
  }
}
