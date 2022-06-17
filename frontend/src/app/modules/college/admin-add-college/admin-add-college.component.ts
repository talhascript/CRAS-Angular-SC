import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CollegeService } from 'src/app/shared/services/college/college.service';

@Component({
  selector: 'app-admin-add-college',
  templateUrl: './admin-add-college.component.html',
  styleUrls: ['./admin-add-college.component.css'],
})
export class AdminAddCollegeComponent implements OnInit {
  collegeNameFormControl = new FormControl('', [Validators.required]);

  addressFormControl = new FormControl('', [Validators.required]);

  constructor(
    private collegeService: CollegeService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  async ngOnInit() {}

  async onSubmit() {
    this.collegeNameFormControl.markAllAsTouched();
    this.addressFormControl.markAllAsTouched();
    if (!this.collegeNameFormControl.valid || !this.addressFormControl.valid)
      return;
    await this.collegeService.addCollege(
      this.collegeNameFormControl.value,
      this.addressFormControl.value
    );
    this.matSnackBar.open('A college has been added successfully', '', {
      duration: 5000,
    });
    this.router.navigate(['/admin/college']);
  }
}
