import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'release'
})
export class ReleasePipe implements PipeTransform {

    transform = (value: string) => moment(value).format("MMMM YYYY");

}
