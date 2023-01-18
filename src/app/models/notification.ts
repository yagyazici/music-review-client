import { UserDTO } from "./userDTO";

export class Notification {
    NotificationId: string;
    NotificationType: string
    FromUser: UserDTO;
    NotificationDate: Date
}