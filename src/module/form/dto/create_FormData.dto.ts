import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateFormDataDto {

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  org_name: string;

  @IsString()
  @IsNotEmpty()
  number: string;

}
