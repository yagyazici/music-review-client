import { Component, Input } from '@angular/core';
import { ArtistAlbumsItem } from 'src/app/models/Spotify/ArtistAlbums/ArtistAlbumsItem';

@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})
export class AlbumComponent {
    @Input() album: ArtistAlbumsItem
}
