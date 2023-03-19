import { UserDTO } from "./userDTO";

export class Reply {
    Id: string;
    User: UserDTO;
    Comment: string;
    ReplyDate: Date;
}
