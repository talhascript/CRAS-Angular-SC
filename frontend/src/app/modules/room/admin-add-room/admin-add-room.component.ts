import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomService } from './../../../shared/services/room/room.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-add-room',
  templateUrl: './admin-add-room.component.html',
  styleUrls: ['./admin-add-room.component.css'],
})
export class AdminAddRoomComponent implements OnInit {
  id: string = '';
  roomNameFormControl = new FormControl('', [Validators.required]);
  capacityFormControl = new FormControl('');
  roomType: string = '';
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}
  capacity: number = 0;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
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
    await this.roomService.addRoom(
      this.id,
      this.roomNameFormControl.value,
      this.roomType,
      this.capacityFormControl.value
    );
    this.router
      .navigate(['/admin/college/room'], { queryParams: { id: this.id } })
      .then((navigated: boolean) => {
        if (navigated) {
          this.matSnackBar.open('A room has been added successfully', '', {
            duration: 5000,
          });
        }
      });
  }
}
