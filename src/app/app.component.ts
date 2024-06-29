import { Component } from '@angular/core';
import { RouterLink,RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListMenuComponent } from './components/list-menu/list-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink,
            RouterOutlet,
            NavbarComponent,
            ListMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
