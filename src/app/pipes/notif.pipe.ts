import { Pipe, PipeTransform } from '@angular/core';
import { Notification } from 'src/app/models/Auth/notification';

@Pipe({
    name: 'notif'
})
export class NotifPipe implements PipeTransform {

    transform(notification: Notification): string {
        if (notification.NotificationType == "follower")
        {
            return "started following you."
        }
        return "liked your review"
    }

}
