import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  getHello(): string {
    return 'Welcome to authorized outdefine api, Hello World!';
  }
}
