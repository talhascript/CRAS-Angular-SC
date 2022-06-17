import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/shared/models/application';
import { ApplicationService } from 'src/app/shared/services/application/application.service';

@Component({
  selector: 'app-admin-application-history',
  templateUrl: './admin-application-history.component.html',
  styleUrls: ['./admin-application-history.component.css']
})
export class AdminApplicationHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'index', 'applicationDate', 'processedDate', 'name', 'collegeName', 'roomName', 'roomType', 'status'
  ]
  applicationHistoryList: Application[] = [];
  constructor(private applicationService: ApplicationService) { }

  async ngOnInit() {
    this.applicationHistoryList = await this.applicationService.getApplicationHistoryList();
  }

}
