import {
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll() {
    console.log('intier');
    return 'this action returns all cats';
  }

  @Get('request')
  request(@Req() request: Request): string {
    console.log(request.query);
    console.log(request.params);
    return 'call request';
  }

  @Get('query')
  query(@Query('name') name: string): string {
    console.log(name);
    return 'call query';
  }

  @Post('getCreate')
  @Header('Cache-Control', 'none')
  @HttpCode(200)
  create() {
    console.log('inter');
    return 'this action adds a new cat';
  }
}
