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
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/shared/interfaces/student';
import { StudentService } from 'src/app/shared/services/student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { City } from 'src/app/shared/interfaces/city';
import { CityService } from 'src/app/shared/services/city.service';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Gender } from 'src/app/shared/interfaces/gender';

@Component({
  selector: 'app-update-student',
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
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent implements OnInit {
studentService = inject(StudentService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  student: Student;
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
    email: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    user: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
      const studentId = this.route.snapshot.params['id'];
      this.studentService.getStudentById(studentId).subscribe({
        next: (student) => {
          this.student = student;
          this.form.patchValue({ firstname: student.firstname });
          this.form.patchValue({ lastname: student.lastname });
          this.form.patchValue({ gender: student.gender });
          this.form.patchValue({ email: student.email });
          this.form.patchValue({ city: student.city.city });
          this.form.patchValue({ user: student.user.username });
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching student:', error.message);
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
    
      this.cityService.getCities().subscribe({
        next: (data) => {
          this.cities = data;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching cities:', error.message);
        }
      });
         
  }

  updateStudent() {
    if (this.form.valid) {
      const cityToUpdate = this.cities.find(city => city.city === this.form.value.city);
      const userToUpdate = this.users.find(user => user.username === this.form.value.user);
      
      if (!cityToUpdate || !userToUpdate) {
        console.error('Selected city or user does not exist.');
        return;
      }
  
      this.student.firstname = this.form.value.firstname;
      this.student.lastname = this.form.value.lastname;
      this.student.gender = this.form.value.gender;
      this.student.email = this.form.value.email;
      this.student.city = cityToUpdate;
      this.student.user = userToUpdate;
  
      this.studentService.updateStudent(this.student).subscribe({
        next: () => {
          if (this.userService.getRole() === "ADMIN") {
            this.router.navigate(['/student-table']);
          } else if (this.userService.getRole() === "STUDENT") {
            this.router.navigate(['/student-dashboard']);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating student:', error.message);
        }
      });
    }
  }

  goBack() {
    if (this.userService.getRole() === "ADMIN") {
      this.router.navigate(['/student-table']);
    } else {
      this.router.navigate(['/student-dashboard']);
    }
  }
}
