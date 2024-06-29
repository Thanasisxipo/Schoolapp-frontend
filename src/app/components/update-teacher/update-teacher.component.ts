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
import { Teacher } from 'src/app/shared/interfaces/teacher';
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { SpecialityService } from 'src/app/shared/services/speciality.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Speciality } from 'src/app/shared/interfaces/speciality';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-update-teacher',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './update-teacher.component.html',
  styleUrl: './update-teacher.component.css'
})
export class UpdateTeacherComponent implements OnInit {
  teacherService = inject(TeacherService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  teacher: Teacher;
  specialityService = inject(SpecialityService);
  userService = inject(UserService);

  users: User[];
  specialities: Speciality[];

  form = new FormGroup ({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    ssn: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    speciality: new FormControl,
    user: new FormControl
  })

  ngOnInit(): void {
    const teacherId = this.route.snapshot.params['id'];
    this.teacherService.getTeacherById(teacherId).subscribe({
      next: (teacher) => {
        this.teacher = teacher;
        this.form.patchValue({ firstname: teacher.firstname });
        this.form.patchValue({ lastname: teacher.lastname });
        this.form.patchValue({ ssn: teacher.ssn });
        this.form.patchValue({ email: teacher.email });
        this.form.patchValue({ speciality: teacher.speciality.speciality });
        this.form.patchValue({ user: teacher.user.username });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching teacher:', error.message);
      }
    });
    this.specialityService.getSpecialities().subscribe({
      next: (data) => {
        this.specialities = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching specialities:', error.message);
      }
    });
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data.filter(user => user.role === 'TEACHER');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching users:', error.message);
      }
    });
  }

  updateTeacher() {
    if (this.form.valid) {
      const specialityToUpdate = this.specialities.find(speciality => speciality.speciality === this.form.value.speciality);
      const userToUpdate = this.users.find(user => user.username === this.form.value.user);

      if (!specialityToUpdate || !userToUpdate) {
        console.error('Selected speciality or user does not exist.');
        return;
      }
      this.teacher.firstname = this.form.value.firstname;
      this.teacher.lastname = this.form.value.lastname;
      this.teacher.ssn = this.form.value.ssn;
      this.teacher.email = this.form.value.email;
      this.teacher.speciality = specialityToUpdate;
      this.teacher.user = userToUpdate; 
      this.teacherService.updateTeacher(this.teacher).subscribe({
        next: () => {
          if (this.userService.getRole() === "ADMIN") {
            this.router.navigate(['/teacher-table']);
          } else {
            this.router.navigate(['/teacher-dashboard']);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating teacher:', error.message);
        }
      });
    }
  }

  goBack() {
    if (this.userService.getRole() === "ADMIN") {
      this.router.navigate(['/teacher-table']);
    } else {
      this.router.navigate(['/teacher-dashboard']);
    }
  }
}
