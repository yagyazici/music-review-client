import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'timehumanize'
})
export class TimehumanizePipe implements PipeTransform {
    transform(value: number | string){
        return moment(value).format("m:ss");
    }
}
