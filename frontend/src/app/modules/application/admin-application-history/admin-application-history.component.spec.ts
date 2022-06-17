import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApplicationHistoryComponent } from './admin-application-history.component';

describe('AdminApplicationHistoryComponent', () => {
  let component: AdminApplicationHistoryComponent;
  let fixture: ComponentFixture<AdminApplicationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApplicationHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApplicationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
