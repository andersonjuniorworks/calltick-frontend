import { Inject, Injectable, Optional } from '@angular/core';
import { Subject, Observable, timer } from 'rxjs';
import { MyNotification } from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifications: Array<MyNotification> = [];

  constructor(@Inject('ttlDefault') @Optional() private ttlDefault: number) {
    this.ttlDefault = ttlDefault || 3000;
  }

  notify(notification: MyNotification) {
    if (!notification.ttl) {
      notification.ttl = this.ttlDefault;
    }

    this.notifications.push(notification);

    setTimeout(() => {
      this.notifications.shift();
    }, this.ttlDefault);
  }
}
