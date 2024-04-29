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
import { FormDataServise } from './FormData.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateFormDataDto } from './dto/update_FormData.dto';
import { jwtGuard } from '../auth/guards/jwt.guard';
import { CreateFormDataDto } from './dto/create_FormData.dto';
@Controller('Form')
@ApiTags('Form')
@ApiBearerAuth('JWT-auth')
export class FormDataController {
  readonly #_service: FormDataServise;
  constructor(service: FormDataServise) {
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



  // @UseGuards(jwtGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: [
        'org_name',
        'number'
      ],
      properties: {
        org_name: {
          type: 'string',
          default: 'Eshmatov eshamat Eshmatovich',
        },
        number: {
          type: 'string',
          default: '+998933843484',

        },
      },
    },
  })
  // @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(
    // @UploadedFiles()
    // files: { image?: Express.Multer.File; },
    @Body() createFormDataDto: CreateFormDataDto,
  ) {
    
    return await this.#_service.create(
      createFormDataDto
    );
  }

  // @UseGuards(jwtGuard)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        org_name: {
          type: 'string',
          default: 'Eshmatov eshamat Eshmatovich',
        },
        number: {
          type: 'string',
          default: '+998933843484',

        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() updateFormDataDto: UpdateFormDataDto,
    // @UploadedFiles()
    // file: { image?: Express.Multer.File; },
  ) {
    await this.#_service.update(
      id,
      updateFormDataDto
    );
  }

  // @UseGuards(jwtGuard)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.#_service.remove(id);
  }
}
