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
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Student } from 'src/app/shared/interfaces/student';
import { StudentService } from 'src/app/shared/services/student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { Course } from 'src/app/shared/interfaces/course';
import { City } from 'src/app/shared/interfaces/city';
import { CityService } from 'src/app/shared/services/city.service';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Gender } from 'src/app/shared/interfaces/gender';
import { CourseService } from 'src/app/shared/services/course.service';

@Component({
  selector: 'app-insert-student',
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
  templateUrl: './insert-student.component.html',
  styleUrl: './insert-student.component.css'
})
export class InsertStudentComponent implements OnInit {
  studentService = inject(StudentService);
  router = inject(Router);
  student: Student;
  course: Course;
  cityService = inject(CityService);
  userService = inject(UserService);

  
  users: User[];
  cities: City[];

  genders: Gender[] = [
    {value: 'M', viewValue: 'MALE'},
    {value: 'F', viewValue: 'FEMALE'}
  ];

  form = new FormGroup ({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    city: new FormControl(null),
    user: new FormControl(null)
  })

  ngOnInit(): void {
    this.cityService.getCities().subscribe({
      next: (data) => {
        this.cities = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching cities:', error.message);
      }
    });
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data.filter(user => user.role === 'STUDENT');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching users:', error.message);
      }
    });
  }

  insertStudent() {
    if (this.form.valid) {
      const cityToAdd = this.cities.find(city => city.id === this.form.value.city);
      const userToAdd = this.users.find(user => user.id === this.form.value.user);
  
      const newStudent: Student = {
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
        gender: this.form.value.gender,
        email: this.form.value.email,
        id: 0,
        city: cityToAdd,
        user: userToAdd,
        courses: []
      };
      this.studentService.addStudent(newStudent).subscribe({
        next: () => {
          console.log('Student inserted successfully');
          this.router.navigate(['/student-table']); // Navigate to student table after insertion
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error inserting student:', error.message);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/student-table']);
  }


}
