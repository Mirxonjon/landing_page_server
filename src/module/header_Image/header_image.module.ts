import { Module } from '@nestjs/common';
import { HeaderImageController } from './header_image.controller';
import { HeaderImageServise } from './header_image.service';

@Module({
  controllers: [HeaderImageController],
  providers: [HeaderImageServise],
})
export class HeaderImageModule {}
