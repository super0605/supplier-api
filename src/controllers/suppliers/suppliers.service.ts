import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { readFile, writeFile } from 'fs';

import { SupplierResultType, SupplierType } from './suppliers.interface';
import { CreateSupplierDto } from './dto';

@Injectable()
export class SuppliersService {
  async supplier(): Promise<SupplierResultType> {
    try {
      const contents: any = await this.readFile('data/supplier.json');
      const jsonData =
        contents && contents !== undefined
          ? JSON.parse(contents)
          : { suppliers: [] };

      return jsonData.suppliers;
    } catch (errors: any) {
      console.log(errors);
      throw new HttpException(
        { message: 'Failed to get suppliers' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(dto: CreateSupplierDto): Promise<SupplierType> {
    try {
      const contents: any = await this.readFile('data/supplier.json');
      const jsonData =
        contents && contents !== undefined
          ? JSON.parse(contents)
          : { suppliers: [] };

      if (dto) {
        const newRecord = {
          name: dto?.name,
          logo: dto?.logo,
          address: dto?.address,
        };
        jsonData.suppliers.push(newRecord);
      }

      const jsonFileData = JSON.stringify(jsonData);
      console.log('111111 =====>', jsonFileData);
      const newSupplier: any = await this.writeFileFn(
        'supplier.json',
        jsonFileData,
        dto,
      );

      return newSupplier;
    } catch (errors: any) {
      console.log(errors);
      throw new HttpException(
        { message: 'Failed to add a new supplier', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
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

  async writeFileFn(path: string, data: any, newRecord: SupplierType) {
    return new Promise((resolve, reject) => {
      writeFile(path, data, (err) => {
        if (err) {
          console.log('An error has occurred ', err);
          reject(err);
        }
        console.log('Data written successfully to disk');
        resolve(newRecord);
      });
    });
  }
  // async writeFileFn(path: string, data: any, newRecord: SupplierType) {
  //   return new Promise((resolve, reject) => {
  //     writeFile(path, data, function (err) {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(newRecord);
  //     });
  //   });
  // }
}
