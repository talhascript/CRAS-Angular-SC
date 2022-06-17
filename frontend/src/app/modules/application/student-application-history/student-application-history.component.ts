import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/shared/services/application/application.service';
import { Application } from './../../../shared/models/application';
import { UserService } from './../../../shared/services/user.service';

@Component({
  selector: 'app-student-application-history',
  templateUrl: './student-application-history.component.html',
  styleUrls: ['./student-application-history.component.css'],
})
export class StudentApplicationHistoryComponent implements OnInit {
  applications: Application[] = [];
  displayedColumns: string[] = [
    'applicationDate',
    'college',
    'roomName',
    'roomType',
    'status',
    'processedDate',
  ];
  noData: boolean = true;
  isLoaded: boolean = false;
  hasApplication: boolean = false;

  constructor(
    private applicationService: ApplicationService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.applications =
      await this.applicationService.getStudentApplicationHistory();
    this.isLoaded = true;
    if (this.applications.length > 0) {
      this.noData = false;
      if (this.applications[0].application == 1) this.hasApplication = true;
    }
  }
}
