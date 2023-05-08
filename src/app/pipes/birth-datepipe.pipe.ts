import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'birthDate'
})
export class BirthDatePipe implements PipeTransform {

    transform(value: number | string) {
        if (moment(value).day() === 0 && moment(value).month() === 0){
            // return moment(value).year();
        }
        return moment(value).format("MMMM D, YYYY");
    }
}
