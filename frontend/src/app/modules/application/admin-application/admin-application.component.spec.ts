import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApplicationComponent } from './admin-application.component';

describe('AdminApplicationComponent', () => {
  let component: AdminApplicationComponent;
  let fixture: ComponentFixture<AdminApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
