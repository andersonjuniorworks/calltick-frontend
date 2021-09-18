import { Component } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'calltick-frontend';

  public notifications = "";

  constructor(
    private webSocketService: WebSocketService,
    private notification: NzNotificationService,
  ) {
    let stompClient = this.webSocketService.connect();
    stompClient.connect({}, (frame) => {
      stompClient.subscribe('/topic/notification', (notifications) => {
        this.notifications = JSON.parse(notifications.body);
        this.notification.create('success', 'SUCESSO!', `Um novo chamado foi aberto`);
        this.onPlaySound();
      });
    });
  }

  onPlaySound() {
    let src = './assets/song/bell.wav';
    let audio = new Audio(src);
    audio.play();
  }

}
