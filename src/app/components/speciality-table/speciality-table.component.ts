import { Component, Input, OnInit, inject } from '@angular/core';
import { Speciality } from 'src/app/shared/interfaces/speciality';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { SpecialityService } from 'src/app/shared/services/speciality.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-speciality-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './speciality-table.component.html',
  styleUrl: './speciality-table.component.css'
})
export class SpecialityTableComponent implements OnInit {
  specialityService = inject(SpecialityService);
  specialities: Speciality[] = [];
  router = inject(Router);


  @Input() speciality: Speciality | undefined;

  ngOnInit(): void {
    this.specialityService.getSpecialities().subscribe({
      next: (specialities) => {
        this.specialities = specialities;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching specialities:', error.message);
        
      }
    });
  }

  deleteSpeciality(speciality: Speciality) {
    this.specialityService.deleteSpeciality(speciality).subscribe({
      next: () => {
        this.specialities = this.specialities.filter(speciality => speciality !== speciality);
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting speciality:', error.message);
        // Handle the error as needed
      }
    });
  }
  
  updateSpeciality(speciality: Speciality) {
    this.router.navigate(['/update-speciality', speciality.id]);
  };
  
  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }
   
  insertSpeciality() {
    this.router.navigate(['insert-speciality']);
  } 

}
