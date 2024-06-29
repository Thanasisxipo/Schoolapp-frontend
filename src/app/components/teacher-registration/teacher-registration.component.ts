import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Teacher } from 'src/app/shared/interfaces/teacher';
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { User } from 'src/app/shared/interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-teacher-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './teacher-registration.component.html',
  styleUrl: './teacher-registration.component.css'
})
export class TeacherRegistrationComponent implements OnInit{
  teacherService = inject(TeacherService);
  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  teacher: Teacher;
  users: User[];

  registrationStatus: { success: boolean; message: string } = {
    success: false,
    message: 'Not attempted yet',
  };
  
  form = new FormGroup ({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    ssn: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching users:', error.message);
      }
    });
  }

  onSubmit(value: any) {
    const userId = this.route.snapshot.params['id'];
    const userToAdd = this.users.find(user => user.username === userId);
    if (this.form.valid) {
      const newTeacher: Teacher = {
        firstname: this.form.value.firstname,
        lastname: this.form.value.lastname,
        ssn: this.form.value.ssn,
        email: this.form.value.ssn,
        id: 0,
        speciality: undefined,
        user: userToAdd,
        courses: []
      };
      this.teacherService.addTeacher(newTeacher).subscribe({
        next: () => {
          console.log('Teacher inserted successfully');
          this.router.navigate(['/login']); // Navigate to teacher table after insertion
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error inserting teacher:', error.message);
          // Handle the error as needed
        }
    });
    };
  }
}
