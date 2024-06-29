import { Component } from '@angular/core';
import { RouterLink,RouterOutlet } from '@angular/router';
import { ListMenuComponent } from '../list-menu/list-menu.component';
// import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    ListMenuComponent,
    RouterLink
    // ,
    // RouterOutlet
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
