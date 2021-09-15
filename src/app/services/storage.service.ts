import { User } from './../models/user.model';
import { STORAGE_KEYS } from './../config/storage_keys.config';
import { LocalUser } from './../models/local_user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

    getLocalUser() : User {
        let usr = localStorage.getItem(STORAGE_KEYS.user);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj : User) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.user);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(obj));
        }
    }

}
