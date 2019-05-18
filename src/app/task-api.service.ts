import { Injectable } from "@angular/core";
import { Http,Headers, Response } from "@angular/http";
import { Task } from './task.model';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import {catchError, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  taskList:Task[] = [];

  constructor(private http: HttpClient) { }

  url:string="http://localhost:8006/todolist";
  addUpdateUrl: string="/addUpdate";
  getUrl: string="/find";
  deleteUrl: string = "/delete";
  
    getDetails(){
        const header = new Headers({'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'});
       return this.http.get(this.url+this.getUrl
      //   ,{
      //    headers: header
      //  }
       ).pipe(
          map((data:any) => {
           this.taskList = data.tasks
         }),
         catchError(
           (error:Response) => {
            console.log(error);
            return Observable.throw('Something went wrong');
           }
       )
       );
    }

    postDetails(task:Task){
      const header = new Headers({'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'});
     return this.http.post(this.url+this.addUpdateUrl, task
    //   ,{
    //    headers: header
    //  }
     ).pipe(
       catchError(
         (error:Response) => {
          console.log(error);
          return Observable.throw('Something went wrong');
         }
     )
     );
  }

  delete(id:String){
    const header = new Headers({'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'});
   return this.http.get(this.url+this.deleteUrl+"/"+id
  //   ,{
  //    headers: header
  //  }
   ).pipe(
     catchError(
       (error:Response) => {
        console.log(error);
        return Observable.throw('Something went wrong');
       }
   )
   );
}

}
