import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

@Injectable()
export class WebSocketService {
  private readonly API = `http://187.19.165.178:5050/api`;
  public connect() {
    let socket = new SockJS(`${this.API}`);
    let stompClient = Stomp.over(socket);
    return stompClient;
  }
}
