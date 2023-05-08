import { Component, OnInit } from '@angular/core';
import { ArtistAlbumsItem } from 'src/app/models/Spotify/ArtistAlbums/ArtistAlbumsItem';
import { SpotifyService } from 'src/app/services/Spotify/spotify.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  newReleases: ArtistAlbumsItem[]

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.getNewReleases();
  }

  getNewReleases = () => this.spotifyService.getNewReleases().subscribe(newReleases => this.newReleases = newReleases)
}
