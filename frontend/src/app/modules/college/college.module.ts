import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCollegeComponent } from './admin-college/admin-college.component';
import { AdminEditCollegeComponent } from './admin-edit-college/admin-edit-college.component';
import { AdminAddCollegeComponent } from './admin-add-college/admin-add-college.component';

@NgModule({
  declarations: [AdminCollegeComponent, AdminEditCollegeComponent, AdminAddCollegeComponent],
  imports: [CommonModule, SharedModule],
})
export class CollegeModule {}
