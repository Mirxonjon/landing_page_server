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
import { PartnerCommentServise } from './partnerComment.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreatePartnerDto } from './dto/create_partnerComment.dto';
import { UpdatePartnerDto } from './dto/update_partnerComment.dto';
import { jwtGuard } from '../auth/guards/jwt.guard';
@Controller('PartnerComment')
@ApiTags('Partner Comment')
@ApiBearerAuth('JWT-auth')
export class PartnerCommentController {
  readonly #_service: PartnerCommentServise;
  constructor(service: PartnerCommentServise) {
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
        'camment',
        'image'
      ],
      properties: {
        camment: {
          type: 'string',
          default: 'Yangi yil',
        },
        image: {
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
    FileFieldsInterceptor([{ name: 'image' }]),
  )
  async create(
    @UploadedFiles()
    files: { image?: Express.Multer.File; },
    @Body() createPartnerDto: CreatePartnerDto,
  ) {
    
    return await this.#_service.create(
      createPartnerDto,
      files.image[0],
    );
  }

  @UseGuards(jwtGuard)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        camment: {
          type: 'string',
          default: 'Yangi yil',
        },
        image: {
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
    FileFieldsInterceptor([{ name: 'image' }]),
  )
  async update(
    @Param('id') id: string,
    @Body() updatePartnerDto: UpdatePartnerDto,
    @UploadedFiles()
    file: { image?: Express.Multer.File; },
  ) {
    await this.#_service.update(
      id,
      updatePartnerDto,
      file?.image ? file?.image[0] : null,
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
