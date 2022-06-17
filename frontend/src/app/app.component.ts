import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './core/auth.service';
import { User } from './shared/models/user';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  links = ['home'];
  isActive: number = 0;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    router: Router,
    private snackBar: MatSnackBar
  ) {
    authService.user$.subscribe((user) => {
      if (user?.userType == 'student')
        return router.navigate(['/student/home']);
      if (user?.userType == 'admin') return router.navigate(['/admin/home']);
      return router.navigate(['/']);
    });
    authService.init();
  }

  logOut() {
    this.authService.logout();
    this.snackBar.open('Logged out', '', { duration: 1500 });
  }

  async ngOnInit() {}
  changeActive(index: number) {
    this.isActive = index;
  }
}
