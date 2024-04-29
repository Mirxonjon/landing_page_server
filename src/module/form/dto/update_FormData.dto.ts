import { IsString, MaxLength } from 'class-validator';

export class UpdateFormDataDto {
  @IsString()
  org_name: string;

  @IsString()
  number: string;

}
