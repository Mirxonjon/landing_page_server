import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create_application.dto';
import { UpdateApplicationDto } from './dto/update_application.dto';
import { ApplicationEntity } from 'src/entities/application.entity';

@Injectable()
export class ApplicationServise {

  async findOne(id: string ) {
    const findAplication = await ApplicationEntity.findOneBy({ id }).catch((e) => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });
    if (!findAplication) {
      throw new HttpException('Aplication not found', HttpStatus.NOT_FOUND);
    }
  return findAplication
  }

  

  async findAll() {
    const findAplication = await ApplicationEntity.find({
      order:{
        create_data :'desc'
      }
    });

    if (!findAplication) {
      throw new HttpException('Aplication not found', HttpStatus.NOT_FOUND);
    }

    return findAplication;
  }

  async create(
    body: CreateApplicationDto ,
  ) {

        await ApplicationEntity.createQueryBuilder()
          .insert()
          .into(ApplicationEntity)
          .values({
            type_of_service : body.type_of_service,
            organization_name: body.organization_name,
            name: body.name,
            number :body.number,
            comment: body.comment,
            text :body.text
          })
          .execute()
          .catch((e) => { 
            throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
          });

  }

  async update(
    id: string,
    body: UpdateApplicationDto ,
  ) {
    const findAplication = await ApplicationEntity.findOne({
      where: { id },
    });

    if (!findAplication) {
      throw new HttpException('Apliction Not Found', HttpStatus.NOT_FOUND);
    }

   
        const updated = await ApplicationEntity.update(id, {
          type_of_service : body.type_of_service || findAplication.type_of_service,
          organization_name: body.organization_name || findAplication.organization_name,
          name: body.name || findAplication.name,
          number :body.number || findAplication.number,
          comment: body.comment || findAplication.comment,
          text: body.text || findAplication.text
        });

        return updated;
    
  }

  async remove(id: string) {
    const findAplication = await ApplicationEntity.findOneBy({ id }).catch(() => {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    });

    if (!findAplication) {
      throw new HttpException('Aplication not found', HttpStatus.NOT_FOUND);
    }

    await ApplicationEntity.delete({ id });
  }
}
