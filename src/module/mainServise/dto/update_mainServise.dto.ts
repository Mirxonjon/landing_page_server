import { IsString, MaxLength } from 'class-validator';

export class UpdatemainServiseDto {
  @IsString()
  categoryServise :string


  @IsString()
  type: string;

  text: object;

}
