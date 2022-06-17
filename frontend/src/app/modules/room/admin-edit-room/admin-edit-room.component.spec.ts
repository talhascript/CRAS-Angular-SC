import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditRoomComponent } from './admin-edit-room.component';

describe('AdminEditRoomComponent', () => {
  let component: AdminEditRoomComponent;
  let fixture: ComponentFixture<AdminEditRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
