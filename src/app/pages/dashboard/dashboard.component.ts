import { User } from './../../models/user.model';
import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isCollapsed = false;
  theme = true;

  user: User;

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.onReadUser();
  }

  onReadUser() {
    this.user = this.storageService.getLocalUser();
  }

}
