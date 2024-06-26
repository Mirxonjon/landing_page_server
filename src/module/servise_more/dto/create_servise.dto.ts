import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateServiseDto {
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
  text: string;


  @IsString()
  @IsNotEmpty()
  text_ru: string;


  @IsString()
  @IsNotEmpty()
  text_en: string;

  @IsString()
  @IsNotEmpty()
  price: string;
}
