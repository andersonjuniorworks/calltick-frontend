import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListenService {

  public eventEmit = new EventEmitter<boolean>();

  constructor() { }

  onAddTicket() {
    this.eventEmit.emit(true);
  }

}
