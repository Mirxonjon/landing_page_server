import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create_mainServiseCategory.dto';
import { extname } from 'path';
import { deleteFileCloud, googleCloudAsync } from 'src/utils/google_cloud';
import { UpdatePartnerDto } from './dto/update_mainServiseCategory.dto';
import {
  allowedImageFormats,
} from 'src/utils/videoAndImageFormat';
import { PartnerEntity } from 'src/entities/partner.entity';
import { MainServiseCategoryEntity } from 'src/entities/mainServiseCategory';

@Injectable()
export class mainServiseCategoryServise {

  async findOne(id: string  ) {
    const findCategory = await MainServiseCategoryEntity.findOneBy({ id }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    if (!findCategory) {
      throw new HttpException('category not found', HttpStatus.NOT_FOUND);
    }
  return findCategory
  }

 

  async findAll() {
    const findCategory = await MainServiseCategoryEntity.find({
      order:{
        create_data :'desc'
      }
    });

    if (!findCategory) {
      throw new HttpException('Partners not found', HttpStatus.NOT_FOUND);
    }

    return findCategory;
  }

  async create(
    body: CreatePartnerDto,
  ) {

    const findCategory = await MainServiseCategoryEntity.findOne({
      where: {
        title : body.title
      },
    });
    if (findCategory) {
      throw new HttpException(
        'find category',
        HttpStatus.NO_CONTENT,
      );
    }
  
        
        await MainServiseCategoryEntity.createQueryBuilder()
          .insert()
          .into(MainServiseCategoryEntity)
          .values({
            title: body.title,
            title_ru : body.title_ru,
            title_en : body.title_en
          })
          .execute()
          .catch((e) => { 
            
            throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
          });
  
  }

  async update(
    id: string,
    body: UpdatePartnerDto ,
  ) {
    const findCategory = await MainServiseCategoryEntity.findOne({
      where: { id },
    });

    if (!findCategory) {
      throw new HttpException('category not found', HttpStatus.NOT_FOUND);
    }


        const updated = await MainServiseCategoryEntity.update(id, {
          title : body.title || findCategory.title ,
          title_ru : body.title_ru || findCategory.title_ru,
          title_en : body.title_en || findCategory.title_en 
        });

        return updated;


  }

  async remove(id: string) {
    const findCategory = await MainServiseCategoryEntity.findOneBy({ id }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findCategory) {
      throw new HttpException('Categry not found', HttpStatus.NOT_FOUND);
    }


    await MainServiseCategoryEntity.delete({ id });
  }
}
