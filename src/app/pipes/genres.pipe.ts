import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'genres'
})
export class GenresPipe implements PipeTransform {

    transform(value: any){
        var genres = value.map(
            (genre: string) => genre.charAt(0).toUpperCase() + genre.slice(1)
        )
        return genres.slice(0, 3).join(", ");
    }
}
