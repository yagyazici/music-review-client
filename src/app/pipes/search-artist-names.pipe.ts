import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchArtistNames'
})
export class SearchArtistNamesPipe implements PipeTransform {

    transform(value: any){
        var artists = value && value?.map(
            (artist: any) => artist.name
        );
        return artists?.join(", ");
    }

}
