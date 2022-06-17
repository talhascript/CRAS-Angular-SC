import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Application } from 'src/app/shared/models/application';
import { ApplicationService } from 'src/app/shared/services/application/application.service';

@Component({
  selector: 'app-admin-application',
  templateUrl: './admin-application.component.html',
  styleUrls: ['./admin-application.component.css']
})
export class AdminApplicationComponent implements OnInit {
  displayedColumns: string[] = [
    'index', 'applicationDate', 'name', 'collegeName', 'roomName', 'roomType', 'status', 'action'
  ]
  applications: Application[] = [];
  constructor(private applicationService: ApplicationService, private matSnackBar: MatSnackBar) { }

  async ngOnInit() {
    this.applications = await this.applicationService.getCurrentApplicationList();
  }

  async onApprove(applicationID: string, studentID: string, roomID: string) {
    if (confirm('Are you sure to approve this application?')) {
      await this.applicationService.updateApplication(applicationID, 'approved', studentID, roomID);
      this.applications = await this.applicationService.getCurrentApplicationList();
      this.matSnackBar.open('Approved successfully', 'Close');
    }
  }

  async onUnapprove(applicationID: string, studentID: string, roomID: string) {
    if (confirm('Are you sure to unapprove this application?')) {
      await this.applicationService.updateApplication(applicationID, 'unapproved', studentID, roomID);
      this.applications = await this.applicationService.getCurrentApplicationList();
      this.matSnackBar.open('Unapproved successfully', 'Close');
    }
  }
}
