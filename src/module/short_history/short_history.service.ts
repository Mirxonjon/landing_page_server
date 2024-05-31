import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateShortHistoryDto } from './dto/create_history.dto';
import { extname } from 'path';
import { deleteFileCloud, googleCloud, googleCloudAsync } from 'src/utils/google_cloud';
import { UpdateShortHistoryDto } from './dto/update_history.dto';
import {
  allowedImageFormats,
} from 'src/utils/videoAndImageFormat';
import { AuthServise } from '../auth/auth.service';
import { ShortHistoryEntity } from 'src/entities/short_history.entity';
import { HeaderImageEntity } from 'src/entities/headerImage.entity';
import { StatisticEntity } from 'src/entities/statistic.entity';
import { ApplicationEntity } from 'src/entities/application.entity';
import { ServiseEntity } from 'src/entities/servise.entity';
import { FrendlyTeamEntity } from 'src/entities/our_friendly_team_imeges.entity';
import { PartnerEntity } from 'src/entities/partner.entity';
import { title } from 'process';
import { PartnerCommentEntity } from 'src/entities/parnerComment.entity';
import { text } from 'stream/consumers';

@Injectable()
export class ShortHistoryServise {
  readonly #_authService: AuthServise;
  constructor(authService: AuthServise) {
    this.#_authService = authService;
  }
  async findOne(id: string  ) {
    const findShortHistory = await ShortHistoryEntity.findOneBy({ id }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    if (!findShortHistory) {
      throw new HttpException('short history not found', HttpStatus.NOT_FOUND);
    }
  return findShortHistory
  }


  async getallDataUz () {

    const findHistors = await ShortHistoryEntity.find({
      order:{
        create_data :'desc'
      }
    });

    const findHeaderImages = await HeaderImageEntity.find({
      order:{
        create_data :'desc'
      }
    });

    const findStatistic = await StatisticEntity.find({
      order:{
        create_data :'desc'
      },
      select : {
        title :true ,
        statistic: true 
      }
    });

    // const findAplication = await ApplicationEntity.find({
    //   order:{
    //     create_data :'desc'
    //   }
    // });

    const findServise = await ServiseEntity.find({
      order:{
        create_data :'desc'
      },
      select: {
        title: true,
        image_link: true,
        price: true,
        text: true
      }
    });

    const findServises = findServise.map(e => ({ title: e.title, image_link: e.image_link ,price :e.price , paragraph : e.text }))

    const findImages = await FrendlyTeamEntity.find({
      order:{
        create_data :'desc'
      }
    });

    const findPartners = await PartnerEntity.find({
      order:{
        create_data :'desc'
      }
    });
    const findPartnerComments = await PartnerCommentEntity.find({
      order:{
        create_data :'desc'
      }
    });

    return {
      histories : findHistors,
      headerImages : findHeaderImages,
      statistic : findStatistic,
      // Application : findAplication,
      Servise: findServises,
      TeamImages: findImages,
      partners: findPartners,
      PartnerComments : findPartnerComments

    }
  }

  async getallDataRu () {

    const findHistors = await ShortHistoryEntity.find({
      order:{
        create_data :'desc'
      }
    });

    const findHeaderImages = await HeaderImageEntity.find({
      order:{
        create_data :'desc'
      }
    });

    const findStatistic = await StatisticEntity.find({
      order:{
        create_data :'desc'
      },
      select : {
        title_ru  :true ,
        statistic: true ,
        
      }
    });

  const findstatis = findStatistic.map(e => ({ title: e.title_ru, statistic: e.statistic }))
  

    // const findAplication = await ApplicationEntity.find({
    //   order:{
    //     create_data :'desc'
    //   }
    // });

    const findServise = await ServiseEntity.find({
      order:{
        create_data :'desc'
      },
      select: {
        title_ru: true,
        image_link: true,    
        price: true,
        text_ru: true
      }
    });

  const findServises = findServise.map(e => ({ title: e.title_ru, image_link: e.image_link ,price :e.price , paragraph : e.text_ru }))


    const findImages = await FrendlyTeamEntity.find({
      order:{
        create_data :'desc'
      }
    });

    const findPartners = await PartnerEntity.find({
      order:{
        create_data :'desc'
      }
    });

    const findPartnerComments = await PartnerCommentEntity.find({
      order:{
        create_data :'desc'
      }
    });


    return {
      histories : findHistors,
      headerImages : findHeaderImages,
      statistic : findstatis,
      // Application : findAplication,
      Servise: findServises,
      TeamImages: findImages,
      partners: findPartners,
      PartnerComments : findPartnerComments


    }
  }

  async getallDataEn () {

    const findHistors = await ShortHistoryEntity.find({
      order:{
        create_data :'desc'
      }
    });

    const findHeaderImages = await HeaderImageEntity.find({
      order:{
        create_data :'desc'
      }
    });

    const findStatistic = await StatisticEntity.find({
      order:{
        create_data :'desc'
      },
      select : {
        title_en :true ,
        statistic: true 
      }
    });

    const findstatis = findStatistic.map(e => ({ title: e.title_en, statistic: e.statistic }))

    // const findAplication = await ApplicationEntity.find({
    //   order:{
    //     create_data :'desc'
    //   }
    // });

    const findServise = await ServiseEntity.find({
      order:{
        create_data :'desc'
      },
      select: {
        title_en: true,
        image_link: true,
        price: true,
        text_en: true
      }
    });

    // const findServises = findServise.map(e => ({ title: e.title_en, image_link: e.image_link }))
  const findServises = findServise.map(e => ({ title: e.title_en, image_link: e.image_link ,price :e.price , paragraph : e.text_en }))



    const findImages = await FrendlyTeamEntity.find({
      order:{
        create_data :'desc'
      }
    });

    const findPartners = await PartnerEntity.find({
      order:{
        create_data :'desc'
      }
    });

    const findPartnerComments = await PartnerCommentEntity.find({
      order:{
        create_data :'desc'
      }
    });


    return {
      histories : findHistors,
      headerImages : findHeaderImages,
      statistic : findstatis,
      // Application : findAplication,
      Servise: findServises,
      TeamImages: findImages,
      partners: findPartners,
      PartnerComments : findPartnerComments


    }
  }


  async findAll() {
    const findHistors = await ShortHistoryEntity.find({
      order:{
        create_data :'desc'
      }
    });

    if (!findHistors) {
      throw new HttpException('Books not found', HttpStatus.NOT_FOUND);
    }

    return findHistors;
  }

  async create(
    body: CreateShortHistoryDto,
    history_image: Express.Multer.File,
  ) {
    if (!history_image) {
      throw new HttpException(
        'history_image should not be empty',
        HttpStatus.NO_CONTENT,
      );
    }
    

    const formatImage = extname(history_image?.originalname).toLowerCase();
    if (allowedImageFormats.includes(formatImage)) {
      
        const linkImage :string = await googleCloudAsync(history_image);
        
        await ShortHistoryEntity.createQueryBuilder()
          .insert()
          .into(ShortHistoryEntity)
          .values({
            title: body.title,
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
    body: UpdateShortHistoryDto ,
    history_image: Express.Multer.File,
  ) {
    const findHistory = await ShortHistoryEntity.findOne({
      where: { id },
    });

    if (!findHistory) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    let formatImage: string = 'Not image';

    if (history_image) {
      formatImage = extname(history_image.originalname).toLowerCase();
    }


    if (
      allowedImageFormats.includes(formatImage) ||
      formatImage === 'Not image'
    ) {

        let shor_history_img = findHistory.image_link;

        if (formatImage !== 'Not image') {
          await deleteFileCloud(shor_history_img);
          shor_history_img =await googleCloudAsync(history_image);
        }


        const updated = await ShortHistoryEntity.update(id, {
          title: body.title || findHistory.title,
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
    const findBook = await ShortHistoryEntity.findOneBy({ id }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findBook) {
      throw new HttpException('Video not found', HttpStatus.NOT_FOUND);
    }

    const imageLink = await deleteFileCloud(findBook?.image_link);

    if (!imageLink) {
      throw new HttpException(
        'The video tactic image  was not deleted',
        HttpStatus.NOT_FOUND,
      );
    }


    await ShortHistoryEntity.delete({ id });
  }
}
