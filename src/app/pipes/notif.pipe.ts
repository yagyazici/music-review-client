import { Pipe, PipeTransform } from '@angular/core';
import { Notification } from '../models/notification';

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
