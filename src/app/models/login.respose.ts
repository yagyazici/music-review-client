import { AuthToken } from "./auth-token";
import { RefreshToken } from "./refresh.token";
import { UserDTO } from "./userDTO";

export class LoginRespose {
    AuthToken: AuthToken;
    RefreshToken: RefreshToken;
    CurrentUser: UserDTO;
}
