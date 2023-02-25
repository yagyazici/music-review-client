import { SpotifyArtist } from "../Common/SpotifyArtist";
import { SpotifyImage } from "../Common/SpotifyImage";

export class SearchItem {
    name: string;
    id: string;
    images: SpotifyImage[];
    release_date: string;
    artists: SpotifyArtist[];
}