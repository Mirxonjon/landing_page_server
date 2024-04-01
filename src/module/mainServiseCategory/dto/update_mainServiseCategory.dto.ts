import { IsString, MaxLength } from 'class-validator';

export class UpdatePartnerDto {
  @IsString()
  title: string;

  @IsString()
  title_ru: string;

  @IsString()
  title_en: string;
}
