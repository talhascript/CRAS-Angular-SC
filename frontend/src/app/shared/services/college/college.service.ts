import { College } from './../../models/college';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CollegeService {
  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCollegeList(): Promise<College[]> {
    return this.http.get<College[]>(`${this.apiUrl}/college/`).toPromise();
  }

  getCollegeById(collegeID: string): Promise<College> {
    return this.http
      .get<College>(`${this.apiUrl}/college/${collegeID}`)
      .toPromise();
  }
  addCollege(collegeName: string, address: string) {
    let result = this.http
      .post(`${this.apiUrl}/college/`, {
        collegeName: collegeName,
        address: address,
      })
      .toPromise() as any;
    console.log(result);
    return result;
  }

  updateCollege(
    collegeID: string,
    collegeName: string,
    address: string
  ): Promise<any> {
    let result = this.http
      .put(`${this.apiUrl}/college/${collegeID}`, {
        collegeName: collegeName,
        address: address,
      })
      .toPromise() as any;
    return result;
  }

  deleteCollege(collegeID: string): Promise<any> {
    return this.http
      .delete(`${this.apiUrl}/college/${collegeID}`)
      .toPromise() as any;
  }
}
