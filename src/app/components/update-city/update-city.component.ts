import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { City } from 'src/app/shared/interfaces/city';
import { CityService } from 'src/app/shared/services/city.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-city',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './update-city.component.html',
  styleUrl: './update-city.component.css'
})
export class UpdateCityComponent implements OnInit{
  cityService = inject(CityService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  city: City;
  form = new FormGroup ({
    city: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    const cityId = this.route.snapshot.params['id'];
    this.cityService.getCityById(cityId).subscribe({
      next: (city) => {
        this.city = city;
        this.form.patchValue({ city: city.city });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching city:', error.message);
      }
    });
  }

  updateCity() {
    if (this.form.valid) {
      this.city.city = this.form.value.city;
      this.cityService.updateCity(this.city).subscribe({
        next: () => {
          this.router.navigate(['/city-table']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating city:', error.message);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/city-table']);
  }
}
