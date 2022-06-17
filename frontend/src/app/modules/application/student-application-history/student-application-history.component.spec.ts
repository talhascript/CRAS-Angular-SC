import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApplicationHistoryComponent } from './student-application-history.component';

describe('StudentApplicationHistoryComponent', () => {
  let component: StudentApplicationHistoryComponent;
  let fixture: ComponentFixture<StudentApplicationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentApplicationHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentApplicationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
