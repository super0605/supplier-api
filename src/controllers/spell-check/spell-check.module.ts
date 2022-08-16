import { Module } from '@nestjs/common';
import { SpellCheckController } from './spell-check.controller';
import { SpellCheckService } from './spell-check.service';

@Module({
  controllers: [SpellCheckController],
  providers: [SpellCheckService],
})
export class SpellCheckModule {}
