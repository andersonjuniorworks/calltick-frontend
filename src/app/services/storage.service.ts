import { User } from './../models/user.model';
import { STORAGE_KEYS } from './../config/storage_keys.config';
import { LocalUser } from './../models/local_user.model';
import { Injectable } from '@angular/core';
import { iif } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getLocalUser(): User {
    let usr = sessionStorage.getItem(STORAGE_KEYS.user);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj: User) {
    if (obj == null) {
      sessionStorage.removeItem(STORAGE_KEYS.user);
    } else {
      sessionStorage.setItem(STORAGE_KEYS.user, JSON.stringify(obj));
    }
  }

  getAuthStatus(): boolean {
    let status = sessionStorage.getItem(STORAGE_KEYS.authenticate);
    if (status == null) {
      return null;
    } else {
      return JSON.parse(status);
    }
  }

  setAuthStatus(obj: User) {
    sessionStorage.setItem(STORAGE_KEYS.authenticate, JSON.stringify(obj));
  }
}
