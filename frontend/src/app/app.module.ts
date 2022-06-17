import { RoomModule } from './modules/room/room.module';
import { CollegeModule } from './modules/college/college.module';
import { BrowserModule } from '@angular/platform-browser';
import { ApplicationModule } from './modules/application/application.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { NotFoundModule } from './modules/not-found/not-found.module';
import { HomeModule } from './modules/home/home.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTHttpInterceptor } from './core/jwt-http-interceptor';
import { ProfileModule } from './modules/profile/profile.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    CoreModule,
    SharedModule,
    AuthModule,
    NotFoundModule,
    HomeModule,
    ProfileModule,
    CollegeModule,
    RoomModule,
    ApplicationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
