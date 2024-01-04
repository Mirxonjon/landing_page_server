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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { StatisticServise } from './statistic.service';
import { CreateStatisticDto } from './dto/create_statistic.dto';
import { UpdateStatisticDto } from './dto/update_statistic.dto';
import { jwtGuard } from '../auth/guards/jwt.guard';
@Controller('Statistic')
@ApiTags('Statistic')
@ApiBearerAuth('JWT-auth')
export class StatisticController {
  readonly #_service: StatisticServise;
  constructor(service: StatisticServise) {
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
        'statistic'
      ],
      properties: {
        title: {
          type: 'string',
          default: 'Hamkor',
        },
        title_ru: {
          type: 'string',
          default: 'Партнер',
        },
        title_en: {
          type: 'string',
          default: 'Partner',
        },
        statistic: {
          type: 'string',
          format: '100 000+',
        },
      },
    },
  })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(
    @Body() createStatisticDto: CreateStatisticDto,
  ) {
    return await this.#_service.create(
      createStatisticDto,
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
          default: 'Hamkor',
        },
        title_ru: {
          type: 'string',
          default: 'Партнер',
        },
        title_en: {
          type: 'string',
          default: 'Partner',
        },
        statistic: {
          type: 'string',
          default: '100 000+',
        },
      },
    },
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() updateStatisticDto: UpdateStatisticDto,
  ) {
    await this.#_service.update(
      id,
      updateStatisticDto,
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
