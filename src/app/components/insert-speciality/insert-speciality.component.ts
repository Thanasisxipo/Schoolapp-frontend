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
import { Speciality } from 'src/app/shared/interfaces/speciality';
import { SpecialityService } from 'src/app/shared/services/speciality.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-insert-speciality',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './insert-speciality.component.html',
  styleUrl: './insert-speciality.component.css'
})
export class InsertSpecialityComponent implements OnInit {
  specialityService = inject(SpecialityService);
  router = inject(Router);
  speciality: Speciality;
  form = new FormGroup ({
    name: new FormControl('', Validators.required)
  })

ngOnInit(): void {
  
}

  insertSpeciality() {
    if (this.form.valid) {
      const newSpeciality: Speciality = {
        speciality: this.form.value.name,  // Ensure this matches the speciality interface
        id: 0,
        teachers: []
      };
      this.specialityService.addSpeciality(newSpeciality).subscribe({
        next: () => {
          console.log('Speciality inserted successfully');
          this.router.navigate(['/speciality-table']); // Navigate to speciality table after insertion
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error inserting speciality:', error.message);
          // Handle the error as needed
        }
      });
    }
  }

  


  goBack() {
    this.router.navigate(['/speciality-table']);
  }


}
