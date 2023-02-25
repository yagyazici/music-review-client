import { SpotifyAlbum } from "../Common/SpotifyAlbum";
import { SpotifyArtist } from "../Common/SpotifyArtist";
import { SpotifyImage } from "../Common/SpotifyImage";

export class CurrentSongItem {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    name: string;
    href: string;
    id: string;
    images: SpotifyImage[];
}