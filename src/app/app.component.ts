import { Component, HostListener } from '@angular/core';
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

  user: User = this.storageService.getUser();

  constructor(
    private userService: UserService,
    private storageService: StorageService) {}

  @HostListener('window:beforeunload')
  disconnectHost() {
    this.userService.disconnected(`${this.user.id}`).subscribe();
  }

}
