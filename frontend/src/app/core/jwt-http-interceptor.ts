import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class JWTHttpInterceptor implements HttpInterceptor {
  ignoredPath = ['/auth/login', '/auth/register'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.ignoredPath.some((path) => req.url.includes(path)))
      return next.handle(req);

    if (this.authService.isJWTExpried) {
      this.router.navigate(['/home']);
      this.snackBar.open('Session expired, please login again', '', {
        duration: 2000,
      });
    }
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${this.authService.jwt}` },
    });

    return next.handle(req);
  }
}
