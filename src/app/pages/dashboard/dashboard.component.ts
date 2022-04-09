import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { User } from './../../models/user.model';
import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  isCollapsed = false;
  theme = true;

  user: User = this.storageService.getUser();

  notifications = '';

  constructor(
    private storageService: StorageService,
    private modal: NzModalService,
    private router: Router,
    private notification: NzNotificationService,
    private userService: UserService
  ) {

  }

  ngOnInit() {
    this.onReadUser();
  }

  onReadUser() {
    this.userService.connected(`${this.user.id}`).subscribe((response) => {});
  }

  onLogout() {
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('/login');
    this.userService.disconnected(`${this.user.id}`).subscribe();
  }

  showLogoutConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Alerta',
      nzContent: `Deseja realmente sair do sistema?`,
      nzOkText: 'Sim',
      nzOkType: 'primary',
      nzWidth: '500px',
      nzOkDanger: true,
      nzOnOk: () => this.onLogout(),
      nzCancelText: 'Não',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  onToogleMenu() {
    document.querySelector('#menu').classList.toggle('sidemenu-active');
  }

  onHidden() {
    document.querySelector('#menu').classList.remove('sidemenu-active');
  }

  onPlaySound() {
    let src = './assets/song/bell.wav';
    let audio = new Audio(src);
    audio.play();
  }

}
