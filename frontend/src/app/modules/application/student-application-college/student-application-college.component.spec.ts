import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApplicationCollegeComponent } from './student-application-college.component';

describe('StudentApplicationCollegeComponent', () => {
  let component: StudentApplicationCollegeComponent;
  let fixture: ComponentFixture<StudentApplicationCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentApplicationCollegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentApplicationCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
