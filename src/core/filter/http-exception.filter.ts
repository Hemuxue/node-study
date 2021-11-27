import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的response 对象
    const status = exception.getStatus();

    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Clinet Error'}`;
    const errorResponse = {
      data: {},
      message,
      code: -1,
    };

    response.status(status);
    response.header('Content-type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
