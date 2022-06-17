import { Room } from './../../../shared/models/room';
import { RoomService } from './../../../shared/services/room/room.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-room',
  templateUrl: './admin-edit-room.component.html',
  styleUrls: ['./admin-edit-room.component.css'],
})
export class AdminEditRoomComponent implements OnInit {
  id: string = '';
  roomID: string = '';
  roomNameFormControl = new FormControl('', [Validators.required]);
  capacityFormControl = new FormControl('');
  roomType: string = '';
  room?: Room;
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}
  capacity: number = 0;

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.roomID = params['roomID'];
    });
    this.room = await this.roomService.getRoomById(this.id, this.roomID);
    console.log(this.room);
    this.roomNameFormControl.setValue(this.room.roomName);
    this.roomType = this.room.roomType;
    this.changeCapacity();
  }

  changeCapacity() {
    if (this.roomType == 'Double') {
      this.capacityFormControl.setValue(2);
    } else if (
      this.roomType == 'Single with Toilet' ||
      this.roomType == 'Single without Toilet'
    ) {
      this.capacityFormControl.setValue(1);
    } else {
      this.capacityFormControl.setValue(null);
    }
  }

  async onSubmit() {
    this.roomNameFormControl.markAllAsTouched();
    this.capacityFormControl.markAllAsTouched();
    if (
      !this.roomNameFormControl.valid ||
      this.capacityFormControl.value == null
    )
      return;
    await this.roomService.updateRoom(
      this.roomID,
      this.roomNameFormControl.value,
      this.roomType,
      this.capacityFormControl.value
    );
    this.router
      .navigate(['/admin/college/room'], { queryParams: { id: this.id } })
      .then((navigated: boolean) => {
        if (navigated) {
          this.matSnackBar.open('A room has been updated successfully', '', {
            duration: 5000,
          });
        }
      });
  }
}
