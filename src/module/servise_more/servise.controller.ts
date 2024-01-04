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
import { ServiseMoreServise } from './servise.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateServiseDto } from './dto/create_servise.dto';
import { UpdateServiseDto } from './dto/update_servise.dto';
import { jwtGuard } from '../auth/guards/jwt.guard';
@Controller('Servise')
@ApiTags('Servise')
@ApiBearerAuth('JWT-auth')
export class ServiseController {
  readonly #_service: ServiseMoreServise;
  constructor(service: ServiseMoreServise) {
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
        'title_en',
        'servise_image'
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
        servise_image: {
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
    FileFieldsInterceptor([{ name: 'servise_image' }]),
  )
  async create(
    @UploadedFiles()
    files: { servise_image?: Express.Multer.File; },
    @Body() createServiseDto: CreateServiseDto,
  ) {
    return await this.#_service.create(
      createServiseDto,
      files.servise_image[0],
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
        servise_image: {
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
    FileFieldsInterceptor([{ name: 'servise_image' }]),
  )
  async update(
    @Param('id') id: string,
    @Body() updateServiseDto: UpdateServiseDto,
    @UploadedFiles()
    file: { servise_image?: Express.Multer.File; },
  ) {
    await this.#_service.update(
      id,
      updateServiseDto,
      file?.servise_image ? file?.servise_image[0] : null,
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
