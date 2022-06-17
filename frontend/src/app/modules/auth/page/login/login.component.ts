import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  async onLogin() {
    this.usernameFormControl.markAllAsTouched();
    this.passwordFormControl.markAllAsTouched();
    if (!this.usernameFormControl.valid || !this.passwordFormControl.valid)
      return;
    let result = await this.authService.login({
      username: this.usernameFormControl.value,
      password: this.passwordFormControl.value,
    });
    if (result.status == 'success')
      this.snackBar.open('Login Success', '', { duration: 1500 });
    else
      this.snackBar.open('Login failed, please try again', '', {
        duration: 1500,
      });
  }
}
