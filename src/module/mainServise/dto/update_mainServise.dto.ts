import { IsString, MaxLength } from 'class-validator';

export class UpdatemainServiseDto {
  @IsString()
  categoryServise :string

  @IsString()
  title: string;

  @IsString()
  title_ru: string;

  @IsString()
  title_en: string;

  @IsString()
  type: string;

  text: object;

}
