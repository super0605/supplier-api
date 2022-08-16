import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  getHello(): string {
    return 'Welcome to authorized rundoo api, Hello World!';
  }
}
