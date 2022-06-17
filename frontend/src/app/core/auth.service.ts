import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/models/user';
import { environment } from './../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly apiUrl = environment.apiUrl;
  private helper = new JwtHelperService();

  jwt: string = '';
  private userSubject = new BehaviorSubject<User | null>(null);

  get user$() {
    return this.userSubject.asObservable();
  }

  get isJWTExpried(): boolean {
    return this.helper.isTokenExpired(this.jwt);
  }

  get isLoggedIn$() {
    return this.user$.pipe(map((user) => user != null));
  }

  get isAdmin$() {
    return this.user$.pipe(map((user) => user?.userType == 'admin'));
  }

  constructor(private http: HttpClient) {}

  init() {
    this.jwt = localStorage.getItem('jwt') || '';
    if (!this.isJWTExpried) this.setJWTAndUser(this.jwt);
  }

  async login(user: {
    username: string;
    password: string;
  }): Promise<{ status: string }> {
    let result = (await this.http
      .post(`${this.apiUrl}/auth/login`, user)
      .toPromise()) as any;
    if (result.status == 'success') {
      this.setJWTAndUser(result.jwt);
    }
    return result;
  }

  async register(user: {
    username: string;
    password: string;
    email: string;
    name: string;
    matricNo: string;
  }) {
    let result = (await this.http
      .post(`${this.apiUrl}/auth/register`, user)
      .toPromise()) as any;
    if (result.status == 'success') {
      this.setJWTAndUser(result.jwt);
    }
    return result;
  }

  logout() {
    this.removeJWTAndUser();
  }

  private setJWTAndUser(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.jwt = jwt;
    this.userSubject.next(this.helper.decodeToken(this.jwt).user);
  }

  private removeJWTAndUser() {
    localStorage.removeItem('jwt');
    this.jwt = '';
    this.userSubject.next(null);
  }
}
