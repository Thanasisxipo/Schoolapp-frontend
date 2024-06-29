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
import { Speciality } from 'src/app/shared/interfaces/speciality';
import { SpecialityService } from 'src/app/shared/services/speciality.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-speciality',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './update-speciality.component.html',
  styleUrl: './update-speciality.component.css'
})
export class UpdateSpecialityComponent implements OnInit {
  specialityService = inject(SpecialityService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  speciality: Speciality;
  form = new FormGroup ({
    speciality: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    const specialityId = this.route.snapshot.params['id'];
    this.specialityService.getSpecialityById(specialityId).subscribe({
      next: (speciality) => {
        this.speciality = speciality;
        this.form.patchValue({ speciality: speciality.speciality });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching speciality:', error.message);
      }
    });
  }

  updateSpeciality() {
    if (this.form.valid) {
      this.speciality.speciality = this.form.value.speciality;
      this.specialityService.updateSpeciality(this.speciality).subscribe({
        next: () => {
          this.router.navigate(['/speciality-table']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating speciality:', error.message);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/speciality-table']);
  }
}
