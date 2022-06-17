import { AdminEditRoomComponent } from './modules/room/admin-edit-room/admin-edit-room.component';
import { AdminAddRoomComponent } from './modules/room/admin-add-room/admin-add-room.component';
import { AdminRoomComponent } from './modules/room/admin-room/admin-room.component';
import { AdminAddCollegeComponent } from './modules/college/admin-add-college/admin-add-college.component';
import { AdminEditCollegeComponent } from './modules/college/admin-edit-college/admin-edit-college.component';
import { AdminApplicationComponent } from './modules/application/admin-application/admin-application.component';
import { AdminCollegeComponent } from './modules/college/admin-college/admin-college.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './core/admin-auth.guard';
import { AuthGuard } from './core/auth.guard';

import { LoginComponent } from './modules/auth/page/login/login.component';
import { RegisterComponent } from './modules/auth/page/register/register.component';
import { AdminHomeComponent } from './modules/home/page/admin-home/admin-home.component';
import { HomeComponent } from './modules/home/page/home/home.component';
import { StudentHomeComponent } from './modules/home/page/student-home/student-home.component';
import { NotFoundComponent } from './modules/not-found/page/not-found/not-found.component';
import { ProfileComponent } from './modules/profile/page/profile/profile.component';
import { AdminApplicationHistoryComponent } from './modules/application/admin-application-history/admin-application-history.component';

import { StudentApplicationHistoryComponent } from './modules/application/student-application-history/student-application-history.component';
import { StudentApplicationRoomComponent } from './modules/application/student-application-room/student-application-room.component';
import { StudentApplicationCollegeComponent } from './modules/application/student-application-college/student-application-college.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  //Admin routes
  {
    path: 'admin/home',
    component: AdminHomeComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/college',
    component: AdminCollegeComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/college/add_college',
    component: AdminAddCollegeComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/college/edit_college',
    component: AdminEditCollegeComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/college/room',
    component: AdminRoomComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/college/room/add_room',
    component: AdminAddRoomComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/college/room/edit_room',
    component: AdminEditRoomComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/application',
    component: AdminApplicationComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'admin/application/history',
    component: AdminApplicationHistoryComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },

  //Student routes
  {
    path: 'student/home',
    component: StudentHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'student/application/college',
    component: StudentApplicationCollegeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'student/application/room',
    component: StudentApplicationRoomComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'student/application/history',
    component: StudentApplicationHistoryComponent,
    canActivate: [AuthGuard],
  },

  // TODO: more paths add above
  { path: '**', redirectTo: 'notFound' },
  { path: 'notFound', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
exports: [RouterModule],
})
export class AppRoutingModule {}
