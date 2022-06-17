import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Room } from '../../models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRoomList(id: string): Promise<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}/room/${id}`).toPromise();
  }

  getRoomById(id: string, roomId: String): Promise<Room> {
    return this.http
      .get<Room>(`${this.apiUrl}/room/${id}/${roomId}`)
      .toPromise();
  }

  addRoom(
    collegeId: string,
    roomName: string,
    roomType: string,
    capacity: number
  ): Promise<Room> {
    return this.http
      .post<Room>(`${this.apiUrl}/room/${collegeId}`, {
        roomName: roomName,
        roomType: roomType,
        capacity: capacity,
      })
      .toPromise();
  }

  updateRoom(
    roomId: string,
    roomName: string,
    roomType: string,
    capacity: number
  ): Promise<Room> {
    return this.http
      .put<Room>(`${this.apiUrl}/room/${roomId}`, {
        roomName: roomName,
        roomType: roomType,
        capacity: capacity,
      })
      .toPromise();
  }

  deleteRoom(roomId: string): Promise<Room> {
    return this.http.delete<Room>(`${this.apiUrl}/room/${roomId}`).toPromise();
  }

  changeActivation(roomId: string, activated: boolean): Promise<Room> {
    return this.http
      .put<Room>(`${this.apiUrl}/room/changeActivation/${roomId}`, {
        activated: !activated,
      })
      .toPromise();
  }

  updateRoomOccupied(roomId: string) {
    return this.http
      .put<Room>(`${this.apiUrl}/room/updateOccupied/${roomId}`, {})
      .toPromise();
  }
}
