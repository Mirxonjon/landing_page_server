import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFormDataDto } from './dto/create_FormData.dto';
import { extname } from 'path';
import { deleteFileCloud, googleCloudAsync, writeToSheet } from 'src/utils/google_cloud';
import { UpdateFormDataDto } from './dto/update_FormData.dto';
import {
  allowedImageFormats,
} from 'src/utils/videoAndImageFormat';
import { PartnerEntity } from 'src/entities/partner.entity';
import { FormDataEntity } from 'src/entities/formData.entity';

@Injectable()
export class FormDataServise {

  async findOne(id: string  ) {
    const findFormData = await FormDataEntity.findOneBy({ id }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    if (!findFormData) {
      throw new HttpException('short book not found', HttpStatus.NOT_FOUND);
    }
  return findFormData
  }

 

  async findAll() {
    const findFormDatas= await FormDataEntity.find({
      order:{
        create_data :'desc'
      }
    });

    if (!findFormDatas) {
      throw new HttpException('Partners not found', HttpStatus.NOT_FOUND);
    }

    return findFormDatas;
  }

  async create(
    body: CreateFormDataDto,
  ) {


      

        await FormDataEntity.createQueryBuilder()
          .insert()
          .into(FormDataEntity)
          .values({
            org_name : body.org_name,
            number : body.number
          })
          .execute()
          .catch((e) => { 
console.log(e);

            throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
          });

         await writeToSheet([ [body.org_name , body.number]])

  }

  async update(
    id: string,
    body: UpdateFormDataDto ,

  ) {
    const findFormData = await FormDataEntity.findOne({
      where: { id },
    });

    if (!findFormData) {
      throw new HttpException('FormDate not found', HttpStatus.NOT_FOUND);
    }


        const FormData = await FormDataEntity.update(id, {
          org_name : body.org_name || findFormData.org_name ,
          number :body.number || findFormData.number
        });

        return FormData;


  }

  async remove(id: string) {
    const findFormData = await FormDataEntity.findOneBy({ id }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findFormData) {
      throw new HttpException('Partner not found', HttpStatus.NOT_FOUND);
    }




    await FormDataEntity.delete({ id });
  }
}
