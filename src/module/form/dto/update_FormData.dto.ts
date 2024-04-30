import { IsString, MaxLength } from 'class-validator';

export class UpdateFormDataDto {

  @IsString()
  full_name: string;

  @IsString()
  org_name: string;

  @IsString()
  number: string;

}
