import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreatemainServiseDto {

  @IsString()
  @IsNotEmpty()
  categoryServise :string
  
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  title_ru: string;

  @IsString()
  @IsNotEmpty()
  title_en: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  text: object;

}
