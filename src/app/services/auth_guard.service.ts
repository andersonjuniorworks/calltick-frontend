import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild {

  constructor(
    private router: Router,
    private storage: StorageService,
  ) { }

  private isAuthenticated: boolean = false;

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      this.isAuthenticated = this.storage.getAuthStatus();

      if(!this.isAuthenticated) {
        this.router.navigateByUrl('login');
      }

    return this.isAuthenticated;
  }

}
