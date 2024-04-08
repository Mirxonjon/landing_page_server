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
import { ApplicationServise } from './application.service';
import { CreateApplicationDto } from './dto/create_application.dto';
import { UpdateApplicationDto } from './dto/update_application.dto';
import { jwtGuard } from '../auth/guards/jwt.guard';
@Controller('Application')
@ApiTags('Application')
@ApiBearerAuth('JWT-auth')
export class ApplicationController {
  readonly #_service: ApplicationServise;
  constructor(service: ApplicationServise) {
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

  
  @Get('/sort')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiOperation({ description : 'Bitta operatorni ish grafikini olish uchun Api. Login ga operator dasturga kirish raqami kiritiladi'})
  async findsort(
    @Query('type_of_service') type_of_service: string,
  ) {
    return await this.#_service.findsort(type_of_service);
  }





  // @UseGuards(jwtGuard) 
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: [
        'type_of_service',
        'organization_name',
        'name',
        'number',
        'comment'
      ],
      properties: {
        type_of_service: {
          type: 'string',
          default: 'Hamkor',
        },
        organization_name: {
          type: 'string',
          default: 'Yetakchi tashkilot ',
        },
        name: {
          type: 'string',
          default: 'Yetakchi tashkilot ',
        },
        number: {
          type: 'string',
          default: '+998943548155',
        },
        comment: {
          type: 'string',
          default: 'Yaxshi comment',
        },
        text: {
          type: 'object',
          default:  {
            text: [{ value: '<html> 1</html>' }, { value: '<html> 1</html>' }],
            text1: [{ value: '<html> 1</html>' }, { value: '<html> 1</html>' }],
          },
        },
      },
    },
  })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    return await this.#_service.create(
      createApplicationDto,
    );
  }

  @UseGuards(jwtGuard)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        type_of_service: {
          type: 'string',
          default: 'Hamkor',
        },
        organization_name: {
          type: 'string',
          default: 'Yetakchi tashkilot ',
        },
        name: {
          type: 'string',
          default: 'Yetakchi tashkilot ',
        },
        number: {
          type: 'string',
          default: '+998943548155',
        },
        comment: {
          type: 'string',
          default: 'Yaxshi comment',
        },
        text: {
          type: 'object',
          default:  {
            text: [{ value: '<html> 1</html>' }, { value: '<html> 1</html>' }],
            text1: [{ value: '<html> 1</html>' }, { value: '<html> 1</html>' }],
          },
        },
      },
    },
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    await this.#_service.update(
      id,
      updateApplicationDto,
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
