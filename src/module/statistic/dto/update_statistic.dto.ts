import { IsString, MaxLength } from 'class-validator';

export class UpdateStatisticDto {
  @IsString()
  title: string;

  @IsString()
  title_ru: string;

  @IsString()
  title_en: string;

  @IsString()
  statistic: string;
}
