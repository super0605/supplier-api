import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { readFile } from 'fs';

import { SupplierResultType } from './supplier.interface';

@Injectable()
export class SupplierService {
  async supplier(): Promise<SupplierResultType> {
    const contents: any = await this.readFile('supplier.json');
    const jsonData = JSON.parse(contents) || [];

    return jsonData;
  }

  async readFile(path: string) {
    return new Promise((resolve, reject) => {
      readFile(path, 'utf8', function (err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
