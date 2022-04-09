import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  recoveryForm: FormGroup;

  spinner = false;

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.onCreateForm();
  }

  onCreateForm() {
    this.recoveryForm = this.formBuilder.group({
      email: null
    });
  }

  onRecovery() {
    this.spinner = true;
    this.userService.passwordRecovery(this.recoveryForm.value).subscribe((success) => {
      this.notification.create(
        'success',
        'SUCESSO!',
        `Uma nova senha foi enviada para seu email`
      );
      this.onCreateForm();
      this.spinner = false;
    }, (err) => {
      this.notification.create(
        'error',
        'ERRO!',
        `Erro ao recuperar senha`
      );
    });
  }

  onNavigateToLogin() {
    this.router.navigateByUrl("login");
  }

}
