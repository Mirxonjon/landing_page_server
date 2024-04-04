import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, IsJSON } from 'class-validator';

export class CreatemainServiseDto {


  @IsString()
  @IsNotEmpty()
  categoryServise :string
  

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsJSON()
  text: string; 

}
