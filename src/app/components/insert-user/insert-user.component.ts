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
import { Router, RouterLink } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Role } from 'src/app/shared/interfaces/role';
import { HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Course } from 'src/app/shared/interfaces/course';

@Component({
  selector: 'app-insert-user',
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
  templateUrl: './insert-user.component.html',
  styleUrl: './insert-user.component.css'
})
export class InsertUserComponent {
  userService = inject(UserService);
  router = inject(Router);
  user: User;

  roles: Role[] = [
    // {value: 'ADMIN', viewValue: 'ADMIN'},
    {value: 'STUDENT', viewValue: 'STUDENT'},
    {value: 'TEACHER', viewValue: 'TEACHER'},
  ];

  form = new FormGroup ({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  }, this.passwordConfirmValidator);

  passwordConfirmValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return {};
  }

  ngOnInit(): void {
  
  }

  insertUser() {
    if (this.form.valid) {
      const newUser: User = {
        username: this.form.value.username,
        password: this.form.value.password,
        role: this.form.value.role,
        id: 0,
        teacher: undefined,
        student: undefined
      };
      this.userService.addUser(newUser).subscribe({
        next: () => {
          console.log('User inserted successfully');
          this.router.navigate(['/user-table']); // Navigate to user table after insertion
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error inserting user:', error.message);
          // Handle the error as needed
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/user-table']);
  }

}
