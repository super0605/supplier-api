import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { VersionHandler } from './handlers/version.handler';
import { ResponseHandler } from './handlers/response.handler';

@Global()
@Module({
  controllers: [],
  imports: [HttpModule],
  providers: [ResponseHandler, VersionHandler],
  exports: [ResponseHandler, VersionHandler],
})
export class SharedModule {}
