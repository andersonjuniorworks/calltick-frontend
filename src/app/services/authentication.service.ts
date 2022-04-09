import { delay, tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { LocalUser } from '../models/local_user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Credentials } from '../models/credentials.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  user: Observable<User>;

  private isAuthenticated: boolean = true;

  constructor(
    private http: HttpClient,
    public storage: StorageService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  authenticate(creds: Credentials) {
    return this.http.post(`${environment.startUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text',
    });
  }

  successfulLogin(authorizationValue: string) {
    let localUser: LocalUser = {
      token: authorizationValue.substring(7),
    };
    this.storage.setLocalUser(localUser);
    this.isAuthenticated = true;
  }

  navigateToLogin(): void {
    this.router.navigate(['']);
  }

  logout() {
    this.storage.setLocalUser(null);
    this.navigateToLogin();
  }

  userAuthenticated() {
    return this.isAuthenticated;
  }

}
