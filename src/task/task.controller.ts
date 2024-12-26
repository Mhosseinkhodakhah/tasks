import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { task } from './interfaces/task.interface';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post('/create')
  createNewTask(@Req() req: any, @Res() res: any, @Body() body: task) {
    return this.taskService.createTask(req, res, body)
  }

  @Get('/all')
  getAllTasks(@Req() req: any, @Res() res: any) {
    return this.taskService.getAllTasks(req, res)
  }

  @Patch('/done/:taskId')
  doneTask(@Req() req: any, @Res() res: any , @Param('taskId') taskId : string){
    return this.taskService.doneTask(req , res , taskId)
  }


  @Put('/update/:taskId')
  update(@Req() req: any, @Res() res: any , @Param('taskId') taskId : string , @Body() body : task){
    return this.taskService.updateTask(req , res , taskId , body)
  }



  @Delete('/delete/:taskId')
  deleteTask(@Req() req: any, @Res() res: any , @Param('taskId') taskId : string){
    return this.taskService.deleteTask(req , res , taskId)  
  }


}
