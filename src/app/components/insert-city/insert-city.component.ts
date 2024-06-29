import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { City } from 'src/app/shared/interfaces/city';
import { CityService } from 'src/app/shared/services/city.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-insert-city',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './insert-city.component.html',
  styleUrl: './insert-city.component.css'
})
export class InsertCityComponent implements OnInit {
  cityService = inject(CityService);
  router = inject(Router);
  city: City;
  form = new FormGroup ({
    name: new FormControl('', Validators.required)
  })

ngOnInit(): void {
  
}

  insertCity() {
    if (this.form.valid) {
      const newCity: City = {
        city: this.form.value.name,  // Ensure this matches the City interface
        id: 0,
        students: []
      };
      this.cityService.addCity(newCity).subscribe({
        next: () => {
          console.log('City inserted successfully');
          this.router.navigate(['../city-table']); // Navigate to city table after insertion
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error inserting city:', error.message);
          // Handle the error as needed
        }
      });
    }
  }

  


  goBack() {
    this.router.navigate(['../city-table']);
  }

}

