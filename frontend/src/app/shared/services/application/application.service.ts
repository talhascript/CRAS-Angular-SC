import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Application } from '../../models/application';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getCurrentApplicationList(): Promise<Application[]> {
    return this.http
      .get<Application[]>(`${this.apiUrl}/application`)
      .toPromise();
  }

  getApplicationHistoryList(): Promise<Application[]> {
    return this.http
      .get<Application[]>(`${this.apiUrl}/application/history`)
      .toPromise();
  }

  updateApplication(
    applicationID: string,
    status: string,
    studentID: string,
    roomID: string
  ): Promise<any> {
    let result = this.http
      .put(`${this.apiUrl}/application/${applicationID}`, {
        status: status,
        studentID: studentID,
        roomID: roomID,
      })
      .toPromise() as any;
    return result;
  }
  addApplication(roomID: string) {
    let result = this.http
      .post(`${this.apiUrl}/application`, {
        roomID: roomID,
      })
      .toPromise() as any;
    return result;
  }
  getStudentApplicationHistory(): Promise<Application[]> {
    return this.http
      .get<Application[]>(`${this.apiUrl}/application/studentHistory`)
      .toPromise();
  }
}
