import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
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
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { mainServiseCategoryServise } from './mainServiseCategory.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdatePartnerDto } from './dto/update_mainServiseCategory.dto';
import { jwtGuard } from '../auth/guards/jwt.guard';
import { CreatePartnerDto } from './dto/create_mainServiseCategory.dto';
@Controller('mainServiseCategory')
@ApiTags('main Servise Category')
@ApiBearerAuth('JWT-auth')
export class mainServiseCategoryController {
  readonly #_service: mainServiseCategoryServise;
  constructor(service: mainServiseCategoryServise) {
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
        'title'
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
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image' }]),
  )
  async create(
    @UploadedFiles()
    
    @Body() createPartnerDto: CreatePartnerDto,
  ) {
    
    return await this.#_service.create(
      createPartnerDto
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
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image' }]),
  )
  async update(
    @Param('id') id: string,
    @Body() updatePartnerDto: UpdatePartnerDto,
  ) {
    await this.#_service.update(
      id,
      updatePartnerDto,
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
