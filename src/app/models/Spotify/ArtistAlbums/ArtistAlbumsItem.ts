import { SpotifyArtist } from "../Common/SpotifyArtist";
import { SpotifyImage } from "../Common/SpotifyImage";

export class ArtistAlbumsItem {
    artists: SpotifyArtist[];
    id: string;
    images: SpotifyImage[];
    release_date: string;
    type: string;
    uri: string;
    name: string;
}