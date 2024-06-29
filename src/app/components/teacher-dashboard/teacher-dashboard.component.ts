import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'src/app/shared/interfaces/menu-item';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.css'
})
export class TeacherDashboardComponent implements OnInit {
  userService = inject(UserService);
  username: string;
  menu: MenuItem[] = [];

  constructor() {
    this.username = this.userService.getUsername();
  }

  ngOnInit(): void {
    this.userService.getUserByUsername(this.username).subscribe(
      (user: User) => {
        this.menu = [
          { text: 'Personal Details', routerLink: `/update-teacher/${user.teacher.id}` },
          { text: 'User Details', routerLink: `/update-user/${user.id}` },
          { text: 'Courses Table', routerLink: '/course-table'}
        ];
      },
      (error) => {
        console.error('Error fetching user:', error);
        
      }
    );
  }
}
