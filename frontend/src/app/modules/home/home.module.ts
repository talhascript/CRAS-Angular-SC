import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminHomeComponent } from './page/admin-home/admin-home.component';
import { StudentHomeComponent } from './page/student-home/student-home.component';

@NgModule({
  declarations: [HomeComponent, AdminHomeComponent, StudentHomeComponent],
  imports: [CommonModule, SharedModule],
})
export class HomeModule {}
