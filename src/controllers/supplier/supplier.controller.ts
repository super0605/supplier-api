import { Controller, Get, Param, Logger } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SupplierService } from './supplier.service';
import { SupplierResultType } from './supplier.interface';

@ApiTags('Supplier')
@Controller('/supplier')
export class SupplierController {
  private readonly logger = new Logger(SupplierController.name);

  constructor(private readonly supplierService: SupplierService) {}

  @ApiOperation({ summary: 'Supplier' })
  @ApiResponse({ status: 200, description: 'Return status of the api.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('/')
  async supplier(): Promise<SupplierResultType> {
    this.logger.log('supplier: fetching supplier .....');

    return await this.supplierService.supplier();
  }
}
