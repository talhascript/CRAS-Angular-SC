import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { PasswordErrorStateMatcher } from 'src/app/shared/utils/passwordErrorStateMatcher';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm = this.fb.group({
    username: this.fb.control('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    matricNo: this.fb.control('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
    ]),
  });
  passwordForm = this.fb.group(
    {
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmPassword: this.fb.control(''),
    },
    { validators: [this.passwordValidator] }
  );

  public matcher = new PasswordErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatch: true };
  }

  async onRegister() {
    this.registrationForm.markAllAsTouched();
    this.passwordForm.markAllAsTouched();
    if (!this.registrationForm.valid || !this.passwordForm.valid) return;
    const data = this.registrationForm.value;
    const password = this.passwordForm.value.password;

    let user = {
      username: data.username,
      password: password,
      email: data.email,
      name: data.name,
      matricNo: data.matricNo,
    };

    const result = await this.authService.register(user);
    if (result.status == 'success')
      this.snackBar.open('Registration Success, logging in', '', {
        duration: 1500,
      });
    else if (result.message)
      this.snackBar.open(result.message, 'Dismiss', { duration: 1500 });
    else
      this.snackBar.open('Unexpected error occured', 'Dismiss', {
        duration: 1500,
      });
  }
}
