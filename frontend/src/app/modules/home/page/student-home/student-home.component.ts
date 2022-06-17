import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../../shared/services/user.service';
import { User } from './../../../../shared/models/user';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css'],
})
export class StudentHomeComponent implements OnInit {
  user?: User;
  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getCurrentUser;
  }
}
