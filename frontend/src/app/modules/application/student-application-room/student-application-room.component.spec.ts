import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApplicationRoomComponent } from './student-application-room.component';

describe('StudentApplicationRoomComponent', () => {
  let component: StudentApplicationRoomComponent;
  let fixture: ComponentFixture<StudentApplicationRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentApplicationRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentApplicationRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
