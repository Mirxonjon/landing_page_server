import { IsString, MaxLength } from 'class-validator';

export class UpdateServiseDto {
  @IsString()
  title: string;

  @IsString()
  title_ru: string;

  @IsString()
  title_en: string;

  @IsString()
  text: string;


  @IsString()
  text_ru: string;


  @IsString()
  text_en: string;

  @IsString()
  price: string;
}
