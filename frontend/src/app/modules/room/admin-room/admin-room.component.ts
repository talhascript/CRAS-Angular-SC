import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomService } from './../../../shared/services/room/room.service';
import { Room } from './../../../shared/models/room';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-room',
  templateUrl: './admin-room.component.html',
  styleUrls: ['./admin-room.component.css'],
})
export class AdminRoomComponent implements OnInit {
  id: string = '';
  displayedColumns: string[] = [
    'roomID',
    'roomName',
    'roomType',
    'addedDate',
    'activated',
    'capacity',
    'occupied',
    'operation',
  ];
  rooms: Room[] = [];
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    this.rooms = await this.roomService.getRoomList(this.id);
    console.log(this.rooms);
  }

  async onDelete(roomID: string) {
    if (confirm('Are you sure that you want to delete?')) {
      await this.roomService.deleteRoom(roomID);
      this.rooms = await this.roomService.getRoomList(this.id);
      this.matSnackBar.open('A room has been deleted successfully', '', {
        duration: 5000,
      });
    }
  }

  async changeActivation(roomID: string, activated: boolean) {
    await this.roomService.changeActivation(roomID, activated);
    this.rooms = await this.roomService.getRoomList(this.id);
    this.matSnackBar.open(
      'A room has been ' +
        (activated ? 'deactivated' : 'activated') +
        ' successfully',
      '',
      {
        duration: 5000,
      }
    );
  }
}
