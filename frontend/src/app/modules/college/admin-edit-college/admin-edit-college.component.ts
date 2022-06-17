import { MatSnackBar } from '@angular/material/snack-bar';
import { College } from './../../../shared/models/college';
import { CollegeService } from 'src/app/shared/services/college/college.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-admin-edit-college',
  templateUrl: './admin-edit-college.component.html',
  styleUrls: ['./admin-edit-college.component.css'],
})
export class AdminEditCollegeComponent implements OnInit {
  id: string = '';
  college?: College;
  collegeNameFormControl = new FormControl('', [Validators.required]);

  addressFormControl = new FormControl('', [Validators.required]);

  constructor(
    private route: ActivatedRoute,
    private collegeService: CollegeService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    this.college = await this.collegeService.getCollegeById(this.id);
    this.collegeNameFormControl.setValue(this.college.collegeName);
    this.addressFormControl.setValue(this.college.address);
  }

  async update() {
    this.collegeNameFormControl.markAllAsTouched();
    this.addressFormControl.markAllAsTouched();
    if (!this.collegeNameFormControl.valid || !this.addressFormControl.valid)
      return;
    let result = await this.collegeService.updateCollege(
      this.id,
      this.collegeNameFormControl.value,
      this.addressFormControl.value
    );
    this.matSnackBar.open('A college has been updated successfully', '', {
      duration: 5000,
    });
    this.router.navigate(['/admin/college']);
  }
}
