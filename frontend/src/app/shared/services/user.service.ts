import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get getCurrentUser(): Promise<User> {
    return this.http.get<User>(`${this.apiUrl}/user`).toPromise();
  }

  updateEmailAndName(email: string, name: string): Promise<boolean> {
    return this.http
      .post<boolean>(`${this.apiUrl}/user/updateEmailAndName`, {
        email: email,
        name: name,
      })
      .toPromise();
  }

  updatePassword(oldPassword: string, newPassword: string): Promise<any> {
    return this.http
      .post(`${this.apiUrl}/user/updatePassword`, {
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      .toPromise();
  }

  updateProfileImage(file: File): Promise<string> {
    const uploadData = new FormData();
    uploadData.append('profile', file, file.name);
    return this.http
      .post<string>(`${this.apiUrl}/user/updateImage`, uploadData)
      .toPromise();
  }

  updateStudentApplicationStatus() {
    return this.http
      .put<string>(`${this.apiUrl}/user/updateApplicationStatus`, {})
      .toPromise();
  }
}
