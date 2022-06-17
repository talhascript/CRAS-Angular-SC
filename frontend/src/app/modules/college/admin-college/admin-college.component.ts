import { MatSnackBar } from '@angular/material/snack-bar';
import { College } from './../../../shared/models/college';
import { Component, OnInit } from '@angular/core';
import { CollegeService } from 'src/app/shared/services/college/college.service';

@Component({
  selector: 'app-admin-college',
  templateUrl: './admin-college.component.html',
  styleUrls: ['./admin-college.component.css'],
})
export class AdminCollegeComponent implements OnInit {
  displayedColumns: string[] = [
    'collegeID',
    'collegeName',
    'address',
    'addedDate',
    'operation',
  ];
  colleges: College[] = [];

  constructor(
    private collegeService: CollegeService,
    private matSnackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.colleges = await this.collegeService.getCollegeList();
  }

  async onDelete(collegeID: string) {
    if (confirm('Are you sure that you want to delete?')) {
      await this.collegeService.deleteCollege(collegeID);
      this.colleges = await this.collegeService.getCollegeList();
      this.matSnackBar.open('A college has been deleted successfully', 'Close');
    }
  }
}
