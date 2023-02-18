export class Artist {
    id: string;
    images: Image[];
    name: string;
    genres: string[];
    external_urls: ExternalUrls;
}

class Image{
    heigt: number;
    url: string;
    width: number;
}

class ExternalUrls{
    spotify: string;
}