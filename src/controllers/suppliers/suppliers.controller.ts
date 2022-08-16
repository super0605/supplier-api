import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SuppliersService } from './suppliers.service';
import { SupplierResultType } from './suppliers.interface';
import { CreateSupplierDto } from './dto';

@ApiTags('Supplier')
@Controller('/supplier')
export class SuppliersController {
  private readonly logger = new Logger(SuppliersController.name);

  constructor(private readonly supplierService: SuppliersService) {}

  @ApiOperation({ summary: 'Supplier' })
  @ApiResponse({ status: 200, description: 'Return status of the api.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('/')
  async supplier(): Promise<SupplierResultType> {
    this.logger.log('supplier: fetching supplier .....');

    return await this.supplierService.supplier();
  }

  @ApiOperation({ summary: 'Create supplier' })
  @ApiResponse({ status: 200, description: 'Return a new supplier.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('/')
  async create(@Body() supplierData: CreateSupplierDto) {
    return this.supplierService.create(supplierData);
  }
}
