import { SpotifyArtist } from "./SpotifyArtist";
import { SpotifyCopyright } from "./SpotifyCopyright";
import { SpotifyExternalUrls } from "./SpotifyExternalUrls";
import { SpotifyImage } from "./SpotifyImage";
import { SpotifyTracks } from "./SpotifyTracks";

export class SpotifyAlbum {
    album_type: string;
    artists: SpotifyArtist[];
    copyrights: SpotifyCopyright;
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    total_tracks: number;
    tracks: SpotifyTracks;
    type: string;
    uri: string;
}