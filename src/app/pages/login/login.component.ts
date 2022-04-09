import { StorageService } from './../../services/storage.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  passwordVisible = false;
  password?: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router,
    private notification: NzNotificationService,
    private authenticationService: AuthenticationService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onLogin() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
        this.userService.login(this.validateForm.value).subscribe(() => {
          this.userService
          .findByEmail(this.validateForm.get('email').value)
          .subscribe((res) => {
            this.storage.setUser(res);
            this.onNavigateToDashboard();
          });
        }, (err) => {
          console.log(err);
        });
  }

  /*
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.userService.findByEmail(this.validateForm.get('email').value).subscribe((response) => {
      this.storage.setLocalUser(response);
      this.userService.login(this.validateForm.value).subscribe(
        (success) => {
          this.onNavigateToDashboard();
          this.storage.setAuthStatus(success);
        },
        (error) => {
          let err = error;
          this.notification.create(
            'error',
            `ERRO!`,
            `Erro ao tentar logar no sistema!`
          );
        }
      );
    })
  } */

  onNavigateToDashboard() {
    this.route.navigateByUrl('dashboard');
  }

  onNavigateToRecoveryPass() {
    this.route.navigateByUrl('recovery');
  }

}
