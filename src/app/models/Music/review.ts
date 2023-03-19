import { Reply } from "../Auth/reply";
import { UserDTO } from "../Auth/userDTO";

export class Review {
    Id: string;
    Author: UserDTO;
    ArtistName: string;
    ArtistId: string;
    AlbumId: string;
    AlbumName: string;
    AlbumImage: string;
    AlbumRate: number;
    AlbumThoughts: string;
    PublishedDate: Date;
    Edited: boolean;
    EditedDate: Date;
    Likes: string[];
    Replies: Reply[];
}