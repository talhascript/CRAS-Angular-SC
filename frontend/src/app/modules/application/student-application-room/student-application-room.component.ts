import { Component, OnInit } from '@angular/core';
import { RoomService } from './../../../shared/services/room/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from './../../../shared/models/room';
import { ApplicationService } from './../../../shared/services/application/application.service';
import { User } from './../../../shared/models/user';
import { UserService } from './../../../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-application-room',
  templateUrl: './student-application-room.component.html',
  styleUrls: ['./student-application-room.component.css'],
})
export class StudentApplicationRoomComponent implements OnInit {
  collegeId: number = 0;
  rooms: Room[] = [];
  user?: User;
  userID?: string;

  displayedColumns: string[] = [
    'roomName',
    'roomType',
    'capacity',
    'occupied',
    'operation',
  ];

  constructor(
    private router: Router,
    private roomService: RoomService,
    private userService: UserService,
    private applicationService: ApplicationService,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.collegeId = params['id'];
    });

    this.rooms = await this.roomService.getRoomList(this.collegeId.toString());
    this.rooms = this.rooms.filter((room) => {
      return room.capacity - room.occupied > 0;
    });
  }

  async applyForRoom(roomID: string) {
    if (confirm('Are you sure that you want to apply for this room?')) {
      await this.applicationService.addApplication(roomID);
      await this.userService.updateStudentApplicationStatus();
      await this.roomService.updateRoomOccupied(roomID);
      this.matSnackBar.open('Apply success!', 'Close');
      this.router.navigate(['student/home']);
    }
  }
}
