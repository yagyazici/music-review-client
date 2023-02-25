import { SpotifyExternalUrls } from "./SpotifyExternalUrls";
import { SpotifyImage } from "./SpotifyImage";

export class SpotifyArtist {
    id: string;
    images: SpotifyImage[];
    name: string;
    genres: string[];
    external_urls: SpotifyExternalUrls;
}