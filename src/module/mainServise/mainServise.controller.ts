import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MainServiseServise } from './mainServise.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {  UpdatemainServiseDto } from './dto/update_mainServise.dto';
import { jwtGuard } from '../auth/guards/jwt.guard';
import { CreatemainServiseDto } from './dto/create_mainServise.dto';
@Controller('mainServise')
@ApiTags('main Servise')
@ApiBearerAuth('JWT-auth')
export class MainServiseController {
  readonly #_service: MainServiseServise;
  constructor(service: MainServiseServise) {
    this.#_service = service;
  }

  @Get('/one/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findOne(@Param('id') id: string ) {
    return await this.#_service.findOne(id);
  }

  @Get('/all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findAll() {
    return await this.#_service.findAll();
  }



  @UseGuards(jwtGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: [
        'title',
        'title_ru',
        'title_en'
      ],  
      properties: {
        title: {
          type: 'string',
          default: 'Yangi yil',
        },
        title_ru: {
          type: 'string',
          default: 'Новый год',
        },
        title_en: {
          type: 'string',
          default: 'New Year',
        },
        type: {
          type: 'string',
          default : 'banner'
        },
        text: {
          type: 'object',
          default:  {
            text: [{ value: '<html> 1</html>' }, { value: '<html> 1</html>' }],
            text1: [{ value: '<html> 1</html>' }, { value: '<html> 1</html>' }],
          },
        },
        image: {
          type: 'string',
          format: 'binary',
        },
        icon: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image' } ,{name: 'icon'}]),
  )
  async create(
    @UploadedFiles()
    files: { image?: Express.Multer.File; icon?: Express.Multer.File },
    @Body() createmainServiseDto: CreatemainServiseDto,
  ) {
    
    return await this.#_service.create(
      files.image[0],
      files.icon[0],
      createmainServiseDto,
    );
  }

  @UseGuards(jwtGuard)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          default: 'Yangi yil',
        },
        title_ru: {
          type: 'string',
          default: 'Новый год',
        },
        title_en: {
          type: 'string',
          default: 'New Year',
        },
        type: {
          type: 'string',
          default : 'banner'
        },
        text: {
          type: 'object',
          default:  {
            text: [{ value: '<html> 1</html>' }, { value: '<html> 1</html>' }],
            text1: [{ value: '<html> 1</html>' }, { value: '<html> 1</html>' }],
          },
        },
        image: {
          type: 'string',
          format: 'binary',
        },
        icon: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image' },{name: 'icon'}]),
  )
  async update(
    @Param('id') id: string,
    @Body() updatemainServiseDto: UpdatemainServiseDto,
    @UploadedFiles()
    file: { image?: Express.Multer.File; icon?: Express.Multer.File },
  ) {
    await this.#_service.update(
      id,
      file?.image ? file?.image[0] : null,
      file?.icon ? file?.icon[0] : null,
      updatemainServiseDto,
    );
  }

  @UseGuards(jwtGuard)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.#_service.remove(id);
  }
}
