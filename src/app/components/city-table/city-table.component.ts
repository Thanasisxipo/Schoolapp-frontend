import { Component, Input, OnInit, inject } from '@angular/core';
import { City } from 'src/app/shared/interfaces/city';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CityService } from 'src/app/shared/services/city.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-city-table-component',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './city-table.component.html',
  styleUrl: './city-table.component.css'
})
export class CityTableComponentComponent implements OnInit {
  cityService = inject(CityService);
  cities: City[] = [];
  router = inject(Router);

  @Input() city: City | undefined;

  ngOnInit(): void {
    this.cityService.getCities().subscribe({
      next: (cities) => {
        this.cities = cities;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching cities:', error.message);
      }
    });
  }

  deleteCity(city: City) {
    this.cityService.deleteCity(city).subscribe({
      next: () => {
        this.cities = this.cities.filter(city => city !== city);
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting city:', error.message);
        // Handle the error as needed
      }
    });
  }
  
  updateCity(city: City) {
    this.router.navigate(['/update-city', city.id]);
  };
  
  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }
   
  insertCity() {
    this.router.navigate(['insert-city']);
  }

}
