import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  type_of_service: string;

  @IsString()
  @IsNotEmpty()
  organization_name: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  number: string;
  
  @IsString()
  @IsNotEmpty()
  comment: string;
}
