import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.redirect();
  }

  async redirect() {
    const isLoggedIn = await this.authService.isLoggedIn$
      .pipe(take(1))
      .toPromise();
    const isAdmin = await this.authService.isAdmin$.pipe(take(1)).toPromise();
    if (isLoggedIn && isAdmin) return this.router.navigate(['/admin/home']);

    if (isLoggedIn) return this.router.navigate(['/student/home']);

    return;
  }
}
