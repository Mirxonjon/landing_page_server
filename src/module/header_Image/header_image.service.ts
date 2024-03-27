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
    header_image_mobile: Express.Multer.File,
  ) {
    if (!header_image) {
      throw new HttpException(
        'history_image should not be empty',
        HttpStatus.NO_CONTENT,
      );
    }
    if (!header_image_mobile) {
      throw new HttpException(
        'header_image_mobile should not be empty',
        HttpStatus.NO_CONTENT,
      );
    }
    

    const formatImage = extname(header_image?.originalname).toLowerCase();
    const formatImageMobile = extname(header_image_mobile?.originalname).toLowerCase();

    if (allowedImageFormats.includes(formatImage)) {
      
      if(allowedImageFormats.includes(formatImageMobile)) {
          const linkImage :string = await googleCloudAsync(header_image);
          const linkImageMobile :string = await googleCloudAsync(header_image_mobile);
          console.log(linkImage, linkImageMobile);
          

        await HeaderImageEntity.createQueryBuilder()
          .insert()
          .into(HeaderImageEntity)
          .values({
            haeder_image_link : linkImage,
            haeder_image_mobile_link : linkImageMobile
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
    header_image_mobile: Express.Multer.File,
  ) {
    const findHeaderImage = await HeaderImageEntity.findOne({
      where: { id },
    });

    if (!findHeaderImage) {
      throw new HttpException('Header Image not found', HttpStatus.NOT_FOUND);
    }

    // if (!header_image_mobile) {
    //   throw new HttpException(
    //     'header_image_mobile should not be empty',
    //     HttpStatus.NO_CONTENT,
    //   );
    // }
    let formatImage: string = 'Not image';
    let formatImageMobile: string = 'Not image mobile';


      // const formatImage = extname(header_image?.originalname).toLowerCase();
      // const formatImageMobile = extname(header_image_mobile?.originalname).toLowerCase();
      if (header_image) {
        formatImage = extname(header_image.originalname).toLowerCase();
      }
      if (header_image_mobile) {
        formatImageMobile = extname(header_image_mobile.originalname).toLowerCase();
      }

    if (
      allowedImageFormats.includes(formatImage)  ||
      formatImage === 'Not image'
    ) {
      if(allowedImageFormats.includes(formatImageMobile) ||
      formatImageMobile === 'Not image mobile') {

        // let tactic_img = findVideo.tactic_img;
        // let video_link = findVideo.video_link;
        let shor_history_img = findHeaderImage.haeder_image_link;
        let shor_history_mobile_img = findHeaderImage.haeder_image_mobile_link;

        // await deleteFileCloud(shor_history_img);
        // shor_history_img =await googleCloudAsync(header_image);

        if (formatImage !== 'Not image') {
          await deleteFileCloud(shor_history_img);
          shor_history_img = await googleCloudAsync(header_image);
        }

        if (formatImageMobile !== 'Not image mobile') {
          await deleteFileCloud(shor_history_mobile_img);
          shor_history_mobile_img = await googleCloudAsync(header_image_mobile);
        }

        console.log(shor_history_img , shor_history_mobile_img);
        



      const updated = await HeaderImageEntity.update(id, {
        haeder_image_link :shor_history_img ,
        haeder_image_mobile_link : shor_history_mobile_img
      }).catch(e => {console.log(e)
      });

      return updated;
      } else {
        throw new HttpException(
          'Image should be in the format jpg, png, jpeg, pnmj, svg',
          HttpStatus.BAD_REQUEST,
        );
      }

     

    } else {
      throw new HttpException(
        'Image should be in the format jpg, png, jpeg, pnmj, svg, 1',
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
