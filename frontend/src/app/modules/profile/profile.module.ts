import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './page/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangeProfileImageComponent } from './components/change-profile-image/change-profile-image.component';

@NgModule({
  declarations: [ProfileComponent, ChangePasswordComponent, ChangeProfileImageComponent],
  imports: [CommonModule, SharedModule],
})
export class ProfileModule {}
