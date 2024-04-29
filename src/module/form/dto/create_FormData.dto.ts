import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateFormDataDto {
  @IsString()
  @IsNotEmpty()
  org_name: string;

  @IsString()
  @IsNotEmpty()
  number: string;

}
