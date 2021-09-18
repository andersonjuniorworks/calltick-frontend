import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

@Injectable()
export class WebSocketService {
  private readonly API = `${environment.baseUrl}`;
  public connect() {
    let socket = new SockJS(`${this.API}`);
    let stompClient = Stomp.over(socket);
    return stompClient;
  }
}
