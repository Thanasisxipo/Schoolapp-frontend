import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'src/app/shared/interfaces/menu-item';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user'; 

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit{
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
          { text: 'Student Details', routerLink: `/update-student/${user.student.id}` },
          { text: 'User Details', routerLink: `/update-user/${user.id}` }
        ];
      },
      (error) => {
        console.error('Error fetching user:', error);
        
      }
    );
  }
}
