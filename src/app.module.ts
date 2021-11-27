import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envConfig from '../config/env';
import { PostsEntity } from './posts/posts.entity';

const mysqlModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'mysql',
    entities: [PostsEntity],
    host: configService.get('DB_HOST', 'localhost'),
    port: configService.get<number>('DB_PORT', 3306), // 端口号
    username: configService.get('DB_USER', 'root'), // 用户名
    password: configService.get('DB_PASSWORD', 'root'), // 密码
    database: configService.get('DB_DATABASE', 'blog'), //数据库名
    timezone: '+08:00', //服务器上配置的时区
    synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
  }),
});
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envConfig.path],
    }),
    mysqlModule,
    PostsModule,
  ],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
