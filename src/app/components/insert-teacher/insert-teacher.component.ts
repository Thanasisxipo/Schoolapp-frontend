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
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Teacher } from 'src/app/shared/interfaces/teacher';
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { Course } from 'src/app/shared/interfaces/course';
import { Speciality } from 'src/app/shared/interfaces/speciality';
import { SpecialityService } from 'src/app/shared/services/speciality.service';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-insert-teacher',
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
  templateUrl: './insert-teacher.component.html',
  styleUrl: './insert-teacher.component.css'
})
export class InsertTeacherComponent implements OnInit {
  teacherService = inject(TeacherService);
  specialityService = inject(SpecialityService);
  userService = inject(UserService);
  router = inject(Router);
  teacher: Teacher;
  course: Course;

  users: User[];
  specialities: Speciality[];

  form = new FormGroup ({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    ssn: new FormControl('', Validators.required),
    email: new FormControl ('', Validators.required),
    speciality: new FormControl,
    user: new FormControl
  })

ngOnInit(): void {
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

  insertTeacher() {
    if (this.form.valid) {
      const specialityToAdd = this.specialities.find(speciality => speciality.id === this.form.value.speciality);
      const userToAdd = this.users.find(user => user.username === this.form.value.user);

      const newTeacher: Teacher = {
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
        ssn: this.form.value.ssn,
        email: this.form.value.email,
        id: 0,
        speciality: specialityToAdd,
        user: userToAdd,
        courses: []
      };
      this.teacherService.addTeacher(newTeacher).subscribe({
        next: () => {
          console.log('Teacher inserted successfully');
          this.router.navigate(['/teacher-table']); // Navigate to teacher table after insertion
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error inserting teacher:', error.message);
          // Handle the error as needed
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/teacher-table']);
  }

}
