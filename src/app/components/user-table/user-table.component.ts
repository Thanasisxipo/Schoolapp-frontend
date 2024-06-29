import { Component, Input, OnInit, inject } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {
  userService = inject(UserService);
  users: User[] = [];
  router = inject(Router);

  @Input() user: User | undefined;

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching users:', error.message);
        
      }
    });
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe({
      next: () => {
        this.users = this.users.filter(user => user !== user);
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting user:', error.message);
        // Handle the error as needed
      }
    });
  }

  updateUser(user: User) {
    this.router.navigate(['/update-user', user.id]);
  };
  
  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }
   
  insertUser() {
    this.router.navigate(['insert-user']);
  }

}
