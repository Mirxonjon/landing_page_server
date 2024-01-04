import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiseDto } from './dto/create_servise.dto';
import { extname } from 'path';
import { deleteFileCloud, googleCloud, googleCloudAsync } from 'src/utils/google_cloud';
import { UpdateServiseDto } from './dto/update_servise.dto';
import {
  allowedImageFormats,
} from 'src/utils/videoAndImageFormat';

import { ShortHistoryEntity } from 'src/entities/short_history.entity';
import { ServiseEntity } from 'src/entities/servise.entity';

@Injectable()
export class ServiseMoreServise {

  async findOne(id: string ) {
    const findServise = await ServiseEntity.findOneBy({ id }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    if (!findServise) {
      throw new HttpException('Servise not found', HttpStatus.NOT_FOUND);
    }
  return findServise
  }


  async findAll() {
    const findServise = await ServiseEntity.find({
      order:{
        create_data :'desc'
      }
    });

    if (!findServise) {
      throw new HttpException('Servise not found', HttpStatus.NOT_FOUND);
    }

    return findServise;
  }

  async create(
    body: CreateServiseDto,
    servise_image: Express.Multer.File,
  ) {
    if (!servise_image) {
      throw new HttpException(
        'servise_image should not be empty',
        HttpStatus.NO_CONTENT,
      );
    }
    

    const formatImage = extname(servise_image?.originalname).toLowerCase();
    if (allowedImageFormats.includes(formatImage)) {
      
        const linkImage :string = await googleCloudAsync(servise_image);
        
        await ServiseEntity.createQueryBuilder()
          .insert()
          .into(ServiseEntity)
          .values({
            title: body.title,
            title_ru : body.title_ru,
            title_en : body.title_en,
            image_link : linkImage
          })
          .execute()
          .catch(() => { 
            throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
          });
    } else {
      throw new HttpException(
        'image should  be format jpg , png , jpeg , pnmj , svg',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    body: UpdateServiseDto ,
    servise_image: Express.Multer.File,
  ) {
    const findServise = await ServiseEntity.findOne({
      where: { id },
    });

    if (!findServise) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    let formatImage: string = 'Not image';

    if (servise_image) {
      formatImage = extname(servise_image.originalname).toLowerCase();
    }


    if (
      allowedImageFormats.includes(formatImage) ||
      formatImage === 'Not image'

    ) {

        let shor_history_img = findServise.image_link;

        if (formatImage !== 'Not image') {
          await deleteFileCloud(shor_history_img);
          shor_history_img = await googleCloud(servise_image);
        }


        const updated = await ServiseEntity.update(id, {
          title: body.title || findServise.title,
          title_ru : body.title_ru || findServise.title_ru ,
          title_en : body.title_en || findServise.title_en,
          image_link : shor_history_img
        });

        return updated;

    } else {
      throw new HttpException(
        'Image should be in the format jpg, png, jpeg, pnmj, svg',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string) {
    const findServise = await ServiseEntity.findOneBy({ id }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findServise) {
      throw new HttpException('Servise not found', HttpStatus.NOT_FOUND);
    }

    const imageLink = await deleteFileCloud(findServise?.image_link);

    if (!imageLink) {
      throw new HttpException(
        'The Servise image  was not deleted',
        HttpStatus.NOT_FOUND,
      );
    }


    await ShortHistoryEntity.delete({ id });
  }
}
