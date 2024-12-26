import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, taskModel } from './entities/task.entity';
import { auth } from 'src/middleware/middleware.middleware';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';  
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: 'config.env', isGlobal: true }),MongooseModule.forRoot(`${process.env.MONGO_CONNECTION_STRING}`),
  MongooseModule.forFeature([{ name: 'task', schema: taskModel }]),
  ],
  controllers: [TaskController],
  providers: [TaskService , RabbitmqService],
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(auth).forRoutes({ path: 'task/done/:taskId', method: RequestMethod.PATCH },
      // { path: 'task/done/:taskId', method: RequestMethod.PATCH },
      { path: 'task/all', method: RequestMethod.GET })
  }
}
