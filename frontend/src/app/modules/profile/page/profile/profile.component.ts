import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../../../shared/models/user';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { ChangeProfileImageComponent } from '../../components/change-profile-image/change-profile-image.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User = <User>{};
  name: string = '';
  email: string = '';
  constructor(
    public userService: UserService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.user = await this.userService.getCurrentUser;
    this.name = this.user.name || '';
    this.email = this.user.email || '';
  }

  async updateNameAndEmail() {
    const result = await this.userService.updateEmailAndName(
      this.email,
      this.name
    );
    result
      ? this._snackBar.open('Update success', undefined, { duration: 1500 })
      : this._snackBar.open('Update failed', undefined, { duration: 1500 });
  }

  async updatePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        let response = await this.userService.updatePassword(
          result.oldPassword,
          result.newPassword
        );
        if (response?.success) {
          this._snackBar.open('Update success', undefined, { duration: 1500 });
        } else {
          this._snackBar.open(
            `Update failed (${response?.reason || 'Unknown Error'})`,
            undefined,
            {
              duration: 1500,
            }
          );
        }
      }
    });
  }

  async updateProfileImage() {
    const dialogRef = this.dialog.open(ChangeProfileImageComponent, {
      width: '600px',
      data: { defaultImage: this.user?.imagePath },
    });

    dialogRef.afterClosed().subscribe(async (result: File) => {
      if (result) {
        let newImagePath = await this.userService.updateProfileImage(result);
        if (newImagePath) {
          this._snackBar.open('Profile Image Changed !', undefined, {
            duration: 1500,
          });
          this.user.imagePath = newImagePath;
        } else
          this._snackBar.open('Failed!', undefined, {
            duration: 1500,
          });
      }
    });
  }
}
