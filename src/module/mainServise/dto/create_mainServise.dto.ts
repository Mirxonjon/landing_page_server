import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreatemainServiseDto {

  @IsString()
  @IsNotEmpty()
  categoryServise :string
  

  @IsString()
  @IsNotEmpty()
  type: string;

  text: object;

}
