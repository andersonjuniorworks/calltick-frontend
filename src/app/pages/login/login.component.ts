import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  password?: string;

  constructor(private fb: FormBuilder, private userService: UserService, private route: Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.userService.login(this.validateForm.value).subscribe(
      (success) => {
        console.log('Logado');
        this.onNavigateToDashboard();
      },
      (error) => {
        console.log('Deu ruim');
      }
    );
  }

  onNavigateToDashboard() {
    this.route.navigateByUrl('dashboard');
  }

}
