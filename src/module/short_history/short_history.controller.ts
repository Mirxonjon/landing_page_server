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
import { ShortHistoryServise } from './short_history.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateShortHistoryDto } from './dto/create_history.dto';
import { UpdateShortHistoryDto } from './dto/update_history.dto';
import { jwtGuard } from '../auth/guards/jwt.guard';
@Controller()
@ApiTags('Short history')
@ApiBearerAuth('JWT-auth')
export class ShortHistoryController {
  readonly #_service: ShortHistoryServise;
  constructor(service: ShortHistoryServise) {
    this.#_service = service;
  }
  
  @Get('/getAllpageData/uz')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async getallDataUz(
  ) {
    return await this.#_service.getallDataUz();
  }

  @Get('/getAllpageData/ru')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async getallDataRu(
  ) {
    return await this.#_service.getallDataRu();
  }

  @Get('/getAllpageData/en')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async getallDataEn(
  ) {
    return await this.#_service.getallDataEn();
  }
  @Get('ShortHistory/one/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findOne(@Param('id') id: string ) {
    
    return await this.#_service.findOne(id,);
  }

  

  @Get('ShortHistory/all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findAll() {
    return await this.#_service.findAll();
  }


  // @Get('withCategory/allWithPage/:id?')
  // @ApiBadRequestResponse()
  // @ApiNotFoundResponse()
  // @ApiOkResponse()
  // async findallWithpage(
  //   @Param('id') id: string,
  //   @Query('pageNumber') pageNumber: number,
  //   @Query('pageSize') pageSize: number,
  // ) {
  //   return await this.#_service.findAllwithCategory(id ,pageNumber, pageSize);
  // }
  
  // @Get('/filter/uz?')
  // @ApiBadRequestResponse()
  // @ApiNotFoundResponse()
  // @ApiOkResponse()
  // async getfilterUz(@Query('title') title: string , @Query('pageNumber') pageNumber: number,
  // @Query('pageSize') pageSize: number) {
  //   return await this.#_service.getfilterUz(title ,pageNumber ,pageSize);
  // }
  // @Get('/filter/ru?')
  // @ApiBadRequestResponse()
  // @ApiNotFoundResponse()
  // @ApiOkResponse()
  // async getfilterRu(@Query('title') title: string ,  @Query('pageNumber') pageNumber: number,
  // @Query('pageSize') pageSize: number,) {
  //   return await this.#_service.getfilterRu(title ,pageNumber , pageSize);
  // }

  @UseGuards(jwtGuard)
  @Post('ShortHistory/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: [
        'title',
        'history_image'
      ],
      properties: {
        title: {
          type: 'string',
          default: 'Yangi yil',
        },
        history_image: {
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
    FileFieldsInterceptor([{ name: 'history_image' }]),
  )
  async create(
    @UploadedFiles()
    files: { history_image?: Express.Multer.File; },
    @Body() createShortHistoryDto: CreateShortHistoryDto,
  ) {
    
    return await this.#_service.create(
      createShortHistoryDto,
      files.history_image[0],
    );
  }

  @UseGuards(jwtGuard)
  @Patch('ShortHistory/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          default: 'Yangi yil',
        },
        history_image: {
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
    FileFieldsInterceptor([{ name: 'history_image' }]),
  )
  async update(
    @Param('id') id: string,
    @Body() updateShortHistoryDto: UpdateShortHistoryDto,
    @UploadedFiles()
    file: { history_image?: Express.Multer.File; },
  ) {
    await this.#_service.update(
      id,
      updateShortHistoryDto,
      file?.history_image ? file?.history_image[0] : null,
    );
  }

  @UseGuards(jwtGuard)
  @Delete('ShortHistory/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.#_service.remove(id);
  }
}
