import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, length: number): any {
      if(!length){
          length = 30;
      }
    return value.slice(0,length);
  }

}
