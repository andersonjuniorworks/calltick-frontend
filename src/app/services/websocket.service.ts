import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

@Injectable()
export class WebSocketService {

  private readonly API = `${environment.startUrl}`;

  public connect() {
    let socket = new SockJS(`${this.API}`);
    socket.withCredentials = false;
    return Stomp.over(socket);
  }

}
