import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { extname } from 'path';
import { deleteFileCloud, googleCloud, googleCloudAsync } from 'src/utils/google_cloud';
import {
  allowedImageFormats,
} from 'src/utils/videoAndImageFormat';

import { FrendlyTeamEntity } from 'src/entities/our_friendly_team_imeges.entity';

@Injectable()
export class FrendlyTeamServise {

  async findOne(id: string ) {
    const findImage = await FrendlyTeamEntity.findOneBy({ id }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    if (!findImage) {
      throw new HttpException('Image  not found', HttpStatus.NOT_FOUND);
    }
  return findImage
  }

 
  async findAll() {
    const findImages = await FrendlyTeamEntity.find({
      order:{
        create_data :'desc'
      }
    });

    if (!findImages) {
      throw new HttpException('Images not found', HttpStatus.NOT_FOUND);
    }

    return findImages;
  }

  async create(
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
        
        await FrendlyTeamEntity.createQueryBuilder()
          .insert()
          .into(FrendlyTeamEntity)
          .values({
            our_team_image_link : linkImage
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
    image: Express.Multer.File,
  ) {
    const findImage = await FrendlyTeamEntity.findOne({
      where: { id },
    });

    if (!findImage) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }


      const formatImage = extname(image.originalname).toLowerCase();


    if (
      allowedImageFormats.includes(formatImage) 
    ) {

        let shor_history_img = findImage.our_team_image_link;


          await deleteFileCloud(shor_history_img);
          shor_history_img =await googleCloudAsync(image);



        const updated = await FrendlyTeamEntity.update(id, {
          our_team_image_link :shor_history_img
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
    const findImage = await FrendlyTeamEntity.findOneBy({ id }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findImage) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }

    const imageLink = await deleteFileCloud(findImage?.our_team_image_link);

    if (!imageLink) {
      throw new HttpException(
        'The Header image  was not deleted',
        HttpStatus.NOT_FOUND,
      );
    }


    await FrendlyTeamEntity.delete({ id });
  }
}
