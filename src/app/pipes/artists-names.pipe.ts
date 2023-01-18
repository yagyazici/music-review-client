import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'artistsNames'
})
export class ArtistsNamesPipe implements PipeTransform {

    transform(value: any){
        var artists = value && value.item.artists?.map(
            (artist: any) => artist.name
        );
        return artists?.join(", ");
    }

}
