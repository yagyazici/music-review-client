import { Album } from "./album";

export class UserDTO{
    Id = "";
    Username = "";
    Email = "";
    ProfilePicture = "";
    Bio = "";
    BirthDate: "";
    FavoriteAlbums: Album[];
    TokenExpires: Date;
}