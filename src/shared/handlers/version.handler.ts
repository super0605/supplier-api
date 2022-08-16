import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';
import { ConfigService } from '@nestjs/config';

export interface Response<T> {
  data: T;
}

@Injectable()
export class VersionHandler<T> implements NestInterceptor<T, Response<T>> {
  constructor(private configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const http = context.switchToHttp().getRequest<FastifyRequest>();
    const appVersion = this.configService.get('APP_VERSION');
    if (appVersion !== http.headers['App-Version']) {
      throw new ConflictException();
    }
    return next.handle();
  }
}
