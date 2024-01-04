import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  @IsNotEmpty()
  camment: string;

}
