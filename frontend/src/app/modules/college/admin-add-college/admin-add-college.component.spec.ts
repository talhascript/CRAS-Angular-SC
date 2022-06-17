import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCollegeComponent } from './admin-add-college.component';

describe('AdminAddCollegeComponent', () => {
  let component: AdminAddCollegeComponent;
  let fixture: ComponentFixture<AdminAddCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddCollegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
