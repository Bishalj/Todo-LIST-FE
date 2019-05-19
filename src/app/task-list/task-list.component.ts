import { Component, OnInit } from '@angular/core';
import { Status, Label, Task } from '../task.model';
import { TaskApiService } from '../task-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  searchData:string = "";
  taskDetails: FormGroup;
  taskList:Task[] = [];
label:Set<String> = Status.statusSet;
status:Set<String> = Label.LabelSet;
  constructor(private taskService: TaskApiService,
    private fb: FormBuilder) { }

  ngOnInit() 
  {
    this.getAllTask();
    this.taskDetails = this.fb.group({
      _id: [],
      title: ['',[Validators.required]],
      taskDetail: ['',[Validators.required]],
      label: ['',[Validators.required]],
      status: ['',[Validators.required]],
      dueDate: [null,[Validators.required]],
    })
  }
  addDetails(taskDetail: Task){
    this.taskService.postDetails(taskDetail).subscribe(
      () => {
       this.addTask();
        this.getAllTask();
      }
    );
  }

  update(task: Task){
    this.taskDetails.controls['_id'].setValue(task._id);
    this.taskDetails.controls['title'].setValue(task.title);
    this.taskDetails.controls['taskDetail'].setValue(task.taskDetail);
    this.taskDetails.controls['dueDate'].setValue(task.dueDate);
    this.taskDetails.controls['label'].setValue(task.label);
    this.taskDetails.controls['status'].setValue(task.status);
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
this.taskDetails.reset();
  }

  refresh(){
    this.getAllTask();
  }
}
