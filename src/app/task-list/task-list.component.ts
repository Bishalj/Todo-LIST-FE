import { Component, OnInit } from '@angular/core';
import { Status, Label, Task } from '../task.model';
import { TaskApiService } from '../task-api.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  taskList:Task[] = [];
label:Set<String> = Status.statusSet;
status:Set<String> = Label.LabelSet;

task: Task= new Task();
  constructor(private taskService: TaskApiService) { }

  ngOnInit() 
  {
    this.getAllTask();
  }
  addDetails(taskDetail: Task){
    this.taskService.postDetails(taskDetail).subscribe(
      () => {
        this.getAllTask();
        this.task = new Task();
      }
    );
  }

  update(task: Task){
    this.task = task;
  }

  getAllTask(){
    this.taskService.getDetails().subscribe(() =>{
      this.taskList = this.taskService.taskList;
    });
    
  }

  delete(id:string){
    if(confirm("Do you want to delete the task ?")){
      this.taskService.delete(id).subscribe((data) =>{
        this.getAllTask();
      });
    }
  }
  addTask(){
    this.task = new Task();
  }

  refresh(){
    this.getAllTask();
  }
}
