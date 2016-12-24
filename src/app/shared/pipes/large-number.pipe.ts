import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'largeNumber'
})
export class LargeNumberPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        // 208350545 -> 20 mil
        if(value / 1000000 > 1){
            return Math.floor(value / 1000000) + " mil";
        } else if (value / 1000 > 1) {
            return Math.floor(value / 1000) + "k";
        } else {
            return value;
        }
    }

}
