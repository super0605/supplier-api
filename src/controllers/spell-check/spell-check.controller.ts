import { Controller, Get, Param, Logger } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SpellCheckService } from './spell-check.service';
import { SpellCheckResultType } from './spell-check.interface';

@ApiTags('Spell Check')
@Controller('/spellcheck')
export class SpellCheckController {
  private readonly logger = new Logger(SpellCheckController.name);

  constructor(private readonly spellCheckService: SpellCheckService) {}

  @ApiOperation({ summary: 'Spell check without authorization' })
  @ApiResponse({ status: 200, description: 'Return status of the api spell.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('/:word')
  async spellCheck(@Param('word') word: string): Promise<SpellCheckResultType> {
    this.logger.log('landmark: fetching user profile .....');

    return await this.spellCheckService.spellCheck(word.trim());
  }
}
