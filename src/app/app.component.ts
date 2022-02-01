import { TicketService } from './services/ticket.service';
import { ListenService } from './services/listen.service';
import { TicketComponent } from './pages/ticket/ticket.component';
import { Component, HostListener } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from './services/user.service';
import { StorageService } from './services/storage.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'calltick-frontend';

  public notifications = '';

  user: User = this.storageService.getLocalUser();;
  stompClient = this.webSocketService.connect();

  constructor(
    private webSocketService: WebSocketService,
    private userService: UserService,
    private storageService: StorageService) {
  }

  @HostListener('window:beforeunload')
  disconnectHost() {
    this.userService.disconnected(`${this.user.id}`).subscribe();
    this.stompClient.disconnect();
  }

}
