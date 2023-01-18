import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'getYear'
})
export class GetYearPipe implements PipeTransform {
    transform(value: string | Date) {
        return moment(value).toObject().years;
    }
}
