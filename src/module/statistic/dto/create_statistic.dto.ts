import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateStatisticDto {
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
  statistic: string;
}
