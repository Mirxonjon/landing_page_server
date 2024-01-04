import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { extname } from 'path';
import { deleteFileCloud, googleCloudAsync } from 'src/utils/google_cloud';
import {
  allowedImageFormats,
} from 'src/utils/videoAndImageFormat';
import { HeaderImageEntity } from 'src/entities/headerImage.entity';

@Injectable()
export class HeaderImageServise {

  async findOne(id: string  ) {
    const findHeaderImage = await HeaderImageEntity.findOneBy({ id }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    if (!findHeaderImage) {
      throw new HttpException('short book not found', HttpStatus.NOT_FOUND);
    }
  return findHeaderImage
  }

 
  async findAll() {
    const findHeaderImages = await HeaderImageEntity.find({
      order:{
        create_data :'desc'
      }
    });

    if (!findHeaderImages) {
      throw new HttpException('Header Images not found', HttpStatus.NOT_FOUND);
    }

    return findHeaderImages;
  }

  async create(
    header_image: Express.Multer.File,
  ) {
    if (!header_image) {
      throw new HttpException(
        'history_image should not be empty',
        HttpStatus.NO_CONTENT,
      );
    }
    

    const formatImage = extname(header_image?.originalname).toLowerCase();
    if (allowedImageFormats.includes(formatImage)) {
      
        const linkImage :string = await googleCloudAsync(header_image);
        
        await HeaderImageEntity.createQueryBuilder()
          .insert()
          .into(HeaderImageEntity)
          .values({
            haeder_image_link : linkImage
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
    header_image: Express.Multer.File,
  ) {
    const findHeaderImage = await HeaderImageEntity.findOne({
      where: { id },
    });

    if (!findHeaderImage) {
      throw new HttpException('Header Image not found', HttpStatus.NOT_FOUND);
    }


      const formatImage = extname(header_image.originalname).toLowerCase();


    if (
      allowedImageFormats.includes(formatImage) 
    ) {

        let shor_history_img = findHeaderImage.haeder_image_link;


          await deleteFileCloud(shor_history_img);
          shor_history_img =await googleCloudAsync(header_image);



        const updated = await HeaderImageEntity.update(id, {
          haeder_image_link :shor_history_img
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
    const findHeaderImage = await HeaderImageEntity.findOneBy({ id }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findHeaderImage) {
      throw new HttpException('Header Image not found', HttpStatus.NOT_FOUND);
    }

    const imageLink = await deleteFileCloud(findHeaderImage?.haeder_image_link);

    if (!imageLink) {
      throw new HttpException(
        'The Header image  was not deleted',
        HttpStatus.NOT_FOUND,
      );
    }


    await HeaderImageEntity.delete({ id });
  }
}
