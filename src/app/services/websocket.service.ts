import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

@Injectable()
export class WebSocketService {

    // Open connection with the back-end socket
    public connect() {
      let socket = new SockJS(`http://localhost:5050/api`);
      let stompClient = Stomp.over(socket);
      return stompClient;
  }

}
