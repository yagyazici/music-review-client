import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'errors'
})
export class ErrorsPipe implements PipeTransform {

    transform(value: string[]) {
        return value.join(", ");
    }

}
