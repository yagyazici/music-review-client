export class Album {
    artists: Artist[];
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    total_tracks: number;
    album_type: string;
    copyrights: Copyright[];
    external_urls: ExternalUrls;
    tracks: Tracks;
}

class Artist{
    id: string;
    name: string;
    type: string;
    uri: string;
}

class Image{
    heigt: number;
    url: string;
    width: number;
}

export class Copyright{
    text: string ;
    type:string;
}

class ExternalUrls{
    spotify: string;
}

class Tracks{
    items: Item[];
}

class Item{
    duration_ms: number;
    explicit: boolean;
    name: string;
}