import { TicketService } from './services/ticket.service';
import { ListenService } from './services/listen.service';
import { TicketComponent } from './pages/ticket/ticket.component';
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

  public notifications = '';

  constructor(

  ) {

  }

}
