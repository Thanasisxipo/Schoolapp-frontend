import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'src/app/shared/interfaces/menu-item';

@Component({
  selector: 'app-list-menu',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './list-menu.component.html',
  styleUrl: './list-menu.component.css'
})
export class ListMenuComponent {
  menu: MenuItem[] = [
    { text: 'Cities Table', routerLink: '../city-table'},
    { text: 'Courses Table', routerLink: '../course-table'},
    { text: 'Speciality Table', routerLink: '../speciality-table'},
    { text: 'Student Table', routerLink: '../student-table'},
    { text: 'Teacher Table', routerLink: '../teacher-table'},
    { text: 'User Table', routerLink: '../user-table'}
  ];
}
