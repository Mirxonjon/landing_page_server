import { IsString, MaxLength } from 'class-validator';

export class UpdatePartnerDto {
  @IsString()
  camment: string;
}
