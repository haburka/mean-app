import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

    transform(value: string, colspan?: number, totalCol? : number, rowHeight?: number): any {
        let pxWidth = colspan / totalCol * document.body.clientWidth - 52;
        let pxArea = pxWidth * rowHeight;
        let txtWidth = 4.37 * value.length + 30;
        let maxChar = (pxWidth - 30) / 4.37;
        return value.slice(0, pxArea / 12);
    }

}
