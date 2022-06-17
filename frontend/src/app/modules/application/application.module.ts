import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminApplicationComponent } from './admin-application/admin-application.component';
import { AdminApplicationHistoryComponent } from './admin-application-history/admin-application-history.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentApplicationHistoryComponent } from './student-application-history/student-application-history.component';
import { StudentApplicationCollegeComponent } from './student-application-college/student-application-college.component';
import { StudentApplicationRoomComponent } from './student-application-room/student-application-room.component';


@NgModule({
  declarations: [
    AdminApplicationComponent,
    AdminApplicationHistoryComponent,
    StudentApplicationHistoryComponent,
    StudentApplicationCollegeComponent,
    StudentApplicationRoomComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ApplicationModule { }