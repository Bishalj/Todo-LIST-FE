import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Task[], args: string): any {
    return value.filter(
      (data) => {
          return data.title.toLowerCase().startsWith(args.toLowerCase()) || 
          data.taskDetail.toLowerCase().startsWith(args.toLowerCase());
      }
    );
  }
 
}
