import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditCollegeComponent } from './admin-edit-college.component';

describe('AdminEditCollegeComponent', () => {
  let component: AdminEditCollegeComponent;
  let fixture: ComponentFixture<AdminEditCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditCollegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
