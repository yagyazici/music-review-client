import { Album } from "./album";

export class UserDTO{
    Id: string;
    Username: string;
    Email: string;
    ProfilePicture: string;
    Bio: string;
    BirthDate: string;
    FavoriteAlbums: Album[];
    TokenExpires: Date;
}