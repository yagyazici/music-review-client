import { AuthToken } from "../Auth/auth-token";
import { RefreshToken } from "../Auth/refresh.token";
import { UserDTO } from "../Auth/userDTO";

export class LoginRespose {
    AuthToken: AuthToken;
    RefreshToken: RefreshToken;
    CurrentUser: UserDTO;
}
