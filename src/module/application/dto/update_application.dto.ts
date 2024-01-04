import { IsString, MaxLength } from 'class-validator';

export class UpdateApplicationDto {
  @IsString()
  type_of_service: string;

  @IsString()
  organization_name: string;

  @IsString()
  name: string;

  @IsString()
  number: string;
  
  @IsString()
  comment: string;
}
