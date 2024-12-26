import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ConfigService, ConfigModule } from '@nestjs/config'
import { RabbitmqService } from './rabbitmq/rabbitmq.service';


@Module({
  imports: [TaskModule,ConfigModule.forRoot({ envFilePath: 'config.env', isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, RabbitmqService],
})
export class AppModule {}
