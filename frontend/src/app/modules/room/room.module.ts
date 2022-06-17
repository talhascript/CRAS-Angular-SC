import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoomComponent } from './admin-room/admin-room.component';
import { AdminAddRoomComponent } from './admin-add-room/admin-add-room.component';
import { AdminEditRoomComponent } from './admin-edit-room/admin-edit-room.component';

@NgModule({
  declarations: [AdminRoomComponent, AdminAddRoomComponent, AdminEditRoomComponent],
  imports: [CommonModule, SharedModule],
})
export class RoomModule {}
