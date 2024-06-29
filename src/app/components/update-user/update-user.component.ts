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
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Role } from 'src/app/shared/interfaces/role';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from 'src/app/shared/interfaces/student';
import { StudentService } from 'src/app/shared/services/student.service';
import { Teacher } from 'src/app/shared/interfaces/teacher';
import { TeacherService } from 'src/app/shared/services/teacher.service';

@Component({
  selector: 'app-update-user',
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
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {
  userService = inject(UserService);
  studentService = inject(StudentService);
  teacherService = inject(TeacherService);
  
  router = inject(Router);
  route = inject(ActivatedRoute);
  user: User;
  teacher: Teacher;
  student: Student;

  teachers: Teacher[];
  students: Student[];

  roles: Role[] = [
    // {value: 'ADMIN', viewValue: 'ADMIN'},
    {value: 'STUDENT', viewValue: 'STUDENT'},
    {value: 'TEACHER', viewValue: 'TEACHER'},
  ];

  form = new FormGroup ({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  }, this.passwordConfirmValidator);

  passwordConfirmValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return {};
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;
        this.form.patchValue({ username: user.username });
        this.form.patchValue({ password: "" });
        this.form.patchValue({ confirmPassword: "" });
        this.form.patchValue({ role: user.role });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching user:', error.message);
      }
    });
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching students:', error.message);
      }
    });
    this.teacherService.getTeachers().subscribe({
      next: (data) => {
        this.teachers = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching teachers:', error.message);
      }
    });
  }

  updateUser() {
    if (this.form.valid) {
      const updateUser: User = {
        username: this.form.value.username,
        password: this.form.value.password,
        role: this.form.value.role,
        id: this.user.id,
        teacher: this.user.teacher,
        student: this.user.student
      };
      this.userService.updateUser(updateUser).subscribe({
        next: () => {
          console.log('User updates successfully');
          if (this.userService.getRole() === "ADMIN") {
            this.router.navigate(['/user-table']);
          } else if (this.userService.getRole() === "STUDENT") {
            this.router.navigate(['/student-dashboard']);
          } else if (this.userService.getRole() === "TEACHER") {
            this.router.navigate(['/teacher-dashboard']);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error inserting user:', error.message);
        }
      });
    }
  }

  goBack() {
    if (this.userService.getRole() === "ADMIN") {
      this.router.navigate(['/user-table']);
    } else if (this.userService.getRole() === "STUDENT") {
      this.router.navigate(['/student-dashboard']);
    } else if (this.userService.getRole() === "TEACHER") {
      this.router.navigate(['/teacher-dashboard']);
    }
  }
}
