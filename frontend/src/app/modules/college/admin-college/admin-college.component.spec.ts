import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCollegeComponent } from './admin-college.component';

describe('AdminCollegeComponent', () => {
  let component: AdminCollegeComponent;
  let fixture: ComponentFixture<AdminCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCollegeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
