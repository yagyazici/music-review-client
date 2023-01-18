import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

    transform(value: number | string | Date) {
        return moment(value).fromNow();
    }

}
