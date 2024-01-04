import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create_history.dto';
import { extname } from 'path';
import { deleteFileCloud, googleCloudAsync } from 'src/utils/google_cloud';
import { UpdatePartnerDto } from './dto/update_history.dto';
import {
  allowedImageFormats,
} from 'src/utils/videoAndImageFormat';
import { PartnerEntity } from 'src/entities/partner.entity';

@Injectable()
export class PartnerServise {

  async findOne(id: string  ) {
    const findPartner = await PartnerEntity.findOneBy({ id }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    if (!findPartner) {
      throw new HttpException('short book not found', HttpStatus.NOT_FOUND);
    }
  return findPartner
  }

 

  async findAll() {
    const findPartners = await PartnerEntity.find({
      order:{
        create_data :'desc'
      }
    });

    if (!findPartners) {
      throw new HttpException('Partners not found', HttpStatus.NOT_FOUND);
    }

    return findPartners;
  }

  async create(
    body: CreatePartnerDto,
    image: Express.Multer.File,
  ) {
    if (!image) {
      throw new HttpException(
        'image should not be empty',
        HttpStatus.NO_CONTENT,
      );
    }
    

    const formatImage = extname(image?.originalname).toLowerCase();
    if (allowedImageFormats.includes(formatImage)) {

      
        const linkImage :string = await googleCloudAsync(image);
        
        await PartnerEntity.createQueryBuilder()
          .insert()
          .into(PartnerEntity)
          .values({
            camment: body.camment,
            image_link : linkImage
          })
          .execute()
          .catch((e) => { 
            
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
    body: UpdatePartnerDto ,
    image: Express.Multer.File,
  ) {
    const findPartner = await PartnerEntity.findOne({
      where: { id },
    });

    if (!findPartner) {
      throw new HttpException('Partner not found', HttpStatus.NOT_FOUND);
    }

    let formatImage: string = 'Not image';

    if (image) {
      formatImage = extname(image.originalname).toLowerCase();
    }


    if (
      allowedImageFormats.includes(formatImage) ||
      formatImage === 'Not image'
    ) {

        let shor_history_img = findPartner.image_link;

        if (formatImage !== 'Not image') {
          await deleteFileCloud(shor_history_img);
          shor_history_img = await googleCloudAsync(image);
        }


        const updated = await PartnerEntity.update(id, {
          camment: body.camment || findPartner.camment,
          image_link :shor_history_img
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
    const findPartner = await PartnerEntity.findOneBy({ id }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findPartner) {
      throw new HttpException('Partner not found', HttpStatus.NOT_FOUND);
    }

    const imageLink = await deleteFileCloud(findPartner?.image_link);

    if (!imageLink) {
      throw new HttpException(
        'The parner image  was not deleted',
        HttpStatus.NOT_FOUND,
      );
    }


    await PartnerEntity.delete({ id });
  }
}
