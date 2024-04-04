import { HttpException, HttpStatus, Injectable, Body } from '@nestjs/common';
import { CreatemainServiseDto } from './dto/create_mainServise.dto';
import { extname } from 'path';
import { deleteFileCloud, googleCloudAsync } from 'src/utils/google_cloud';
import { UpdatemainServiseDto } from './dto/update_mainServise.dto';
import {
  allowedImageFormats,
} from 'src/utils/videoAndImageFormat';
import { MainServiseEntity } from 'src/entities/mainServise.entity';
import { MainServiseCategoryEntity } from 'src/entities/mainServiseCategory.entity';

@Injectable()
export class MainServiseServise {

  async findOne(id: string  ) {
    const findMainServise = await MainServiseEntity.findOneBy({ id }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    if (!findMainServise) {
      throw new HttpException('short book not found', HttpStatus.NOT_FOUND);
    }
  return findMainServise
  }

 

  async findAll() {
    const findMainServise = await MainServiseEntity.find({
      order:{
        create_data :'desc'
      }
    });

    if (!findMainServise) {
      throw new HttpException('Partners not found', HttpStatus.NOT_FOUND);
    }

    return findMainServise;
  }

  async create(
    image: Express.Multer.File,
    icon : Express.Multer.File,
    body: CreatemainServiseDto,
  ) {
    console.log( body);
    

    const findCategory = await MainServiseCategoryEntity.findOne({
      where: { id : body.categoryServise },
    });

    if (!findCategory) {
      throw new HttpException('category not found', HttpStatus.NOT_FOUND);
    }

    
    let formatImage: string = 'Not image';
    let formatIcon: string = 'Not icon';

    if (image) {
      formatImage = extname(image.originalname).toLowerCase();
    }
    if (icon) {
      formatIcon = extname(icon.originalname).toLowerCase();
    }


    if (
      allowedImageFormats.includes(formatImage) ||
      formatImage === 'Not image'
    ) {

      if(formatImage !== 'Not image') {
        const linkImage :string = await googleCloudAsync(image);

        if(icon) {
          const linkIcon :string = await googleCloudAsync(icon) ;

          await MainServiseEntity.createQueryBuilder()
          .insert()
          .into(MainServiseEntity)
          .values({
            image_link : linkImage,
            icon_link : linkIcon ,
            type : body.type,
            text : JSON.parse(body.text) ,
            categoryServise : findCategory  as any
          })
          .execute()
          .catch((e) => { 
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          });
        } else {
          await MainServiseEntity.createQueryBuilder()
          .insert()
          .into(MainServiseEntity)
          .values({
            image_link : linkImage,
            icon_link : null,
            type : body.type,
            text : JSON.parse(body.text),
            categoryServise : findCategory  as any
          })
          .execute()
          .catch((e) => { 
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          });
        }

        


      } else {
        await MainServiseEntity.createQueryBuilder()
        .insert()
        .into(MainServiseEntity)
        .values({
          icon_link : null ,
          image_link : null,
          type : body.type,
          text : JSON.parse(body.text),
          categoryServise : findCategory  as any
        })
        .execute()
        .catch((e) => { 
          
          throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
        });
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
    image: Express.Multer.File,
    icon: Express.Multer.File,
    body: UpdatemainServiseDto ,
  ) {

    const findMainServise = await MainServiseEntity.findOne({
      where: { id  },
    });

    if (!findMainServise) {
      throw new HttpException('service not found', HttpStatus.NOT_FOUND);
    }

    

    if(findMainServise.categoryServise || body.categoryServise) {

    const findCategory = await MainServiseCategoryEntity.findOne({
      where: { id : body.categoryServise || findMainServise.categoryServise[0].id },
    });

    if (!findCategory) {
      throw new HttpException('category not found', HttpStatus.NOT_FOUND);
    }

    
    let formatImage: string = 'Not image';
    let formatIcon: string = 'Not icon';

    if (image) {
      formatImage = extname(image.originalname).toLowerCase();
    }
    if (icon) {
      formatIcon = extname(icon.originalname).toLowerCase();
    }



    if (
      allowedImageFormats.includes(formatImage) ||
      formatImage === 'Not image'
    ) {

      if(formatImage !== 'Not image') {
        const linkImage :string = await googleCloudAsync(image);

        // const linkIcon :string = await googleCloudAsync(icon) ;

        if(icon) {
          const linkIcon :string = await googleCloudAsync(icon) ;

          await MainServiseEntity.createQueryBuilder()
          .insert()
          .into(MainServiseEntity)
          .values({
            image_link : linkImage,
            icon_link : linkIcon ,
            type : body.type || findMainServise.type,
            text : JSON.parse(body.text) || findMainServise.text ,
            categoryServise : body.categoryServise || findCategory.id as any
          })
          .execute()
          .catch((e) => { 
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          });
        } else {
          await MainServiseEntity.createQueryBuilder()
          .insert()
          .into(MainServiseEntity)
          .values({
            image_link : linkImage,
            icon_link : findMainServise.icon_link,
            type : body.type || findMainServise.type,
            text : JSON.parse(body.text)|| findMainServise.text ,
            categoryServise : body.categoryServise || findCategory.id as any

          })
          .execute()
          .catch((e) => { 
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          });
        }

      } else {

        if(icon) {
          const linkIcon :string = await googleCloudAsync(icon) ;

          await MainServiseEntity.createQueryBuilder()
          .insert()
          .into(MainServiseEntity)
          .values({
            image_link : findMainServise.image_link,
            icon_link : linkIcon ,
            type : body.type || findMainServise.type,
            text : JSON.parse(body.text) || findMainServise.text ,
            categoryServise : body.categoryServise || findCategory.id as any

          })
          .execute()
          .catch((e) => { 
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          });
        } else {
          await MainServiseEntity.createQueryBuilder()
          .insert()
          .into(MainServiseEntity)
          .values({
            image_link : findMainServise.image_link,
            icon_link :  findMainServise.icon_link ,
            type : body.type || findMainServise.type,
            text : JSON.parse(body.text)  || findMainServise.text,
            categoryServise : body.categoryServise || findCategory.id as any

          })
          .execute()
          .catch((e) => { 
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          });
        }

      }

      
        
 
    } else {
      throw new HttpException(
        'image should  be format jpg , png , jpeg , pnmj , svg',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  }

  async remove(id: string) {
    const findMainServise = await MainServiseEntity.findOneBy({ id }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findMainServise) {
      throw new HttpException('Partner not found', HttpStatus.NOT_FOUND);
    }
    if(findMainServise.image_link) {
      const imageLink = await deleteFileCloud(findMainServise?.image_link);

      if (!imageLink) {
        throw new HttpException(
          'The parner image  was not deleted',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    await MainServiseEntity.delete({ id });
  }
}
