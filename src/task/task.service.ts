import { Injectable, Res } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';
import { task } from './interfaces/task.interface';
import { Respons } from 'src/response/response';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class TaskService {
 
  constructor(private readonly rabbitMqService : RabbitmqService , @InjectModel('task') private taskModle : Model<Task>){}

  async createTask(req : any , res : any , body : task){
    try {
      const newTask = await this.taskModle.create(body)
      return new Respons(req , res , 200 , 'create task' , null , newTask)  
    } catch (error) {
      return new Respons(req , res , 500 , 'create task' , `${error}` , null)  
    }
  }



  async getAllTasks(req : any , res : any){
    try {
      const allTasks = await this.taskModle.find()
      return new Respons(req , res , 200 , 'get all task' , null , allTasks)  
    } catch (error) {
      return new Respons(req , res , 500 , 'get all task' , `${error}` , null)  
    }
  }



  async doneTask(req : any , res:any , taskId : string){
    try {
      const userId = req.user._id;
      const task = await this.taskModle.findById(taskId)
      if (!task){
        return new Respons(req , res , 404 , 'done task' , 'this task is not exist on database' , null)
      }
      // send message to user for increasing point
      await this.rabbitMqService.increasePoint(userId , task.points)
      
      task.Completed.push(userId)
      await task.save()
      return new Respons(req , res , 200 , 'done task' , null , task)
    } catch (error) {
      return new Respons(req , res , 500 , 'done task' , `${error}` , null)
    }
  } 


  async updateTask(req : any , res : any , taskId : string , body : task){
    try {
      const taskUpdate = await this.taskModle.findByIdAndUpdate(taskId , body)
      const updated = await this.taskModle.findById(taskId)
      return new Respons(req , res , 200 , 'update task' , null ,updated)  
    } catch (error) {
      return new Respons(req , res , 500 , 'update task' , `${error}` ,null)  
    }
  }


  async deleteTask(req : any , res : any , taskId : string){
    try {
      const task = await this.taskModle.findById(taskId)
      if (!task){
        return new Respons(req , res , 404 , 'update task' , 'this task is not exist on database' , null)
      }
      await task.deleteOne()
      return new Respons(req , res , 200 , 'update task' , null , null)
    } catch (error) {
      return new Respons(req , res , 500 , 'update task' , `${error}` , null)
    }
  }


}
