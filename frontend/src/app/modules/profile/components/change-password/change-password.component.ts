import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  get isPasswordNotMatch() {
    return (
      this.newPassword &&
      this.confirmPassword &&
      this.newPassword != this.confirmPassword
    );
  }

  get isFormCompeted() {
    return (
      !this.isPasswordNotMatch &&
      this.oldPassword &&
      this.confirmPassword &&
      this.newPassword
    );
  }

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>) {}

  ngOnInit(): void {}

  onUpdatePassword() {
    this.dialogRef.close({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    });
  }

  onDismiss() {
    this.dialogRef.close();
  }
}
