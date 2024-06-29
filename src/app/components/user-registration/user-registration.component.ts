import { Component, inject } from '@angular/core';
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
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Role } from 'src/app/shared/interfaces/role';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-user-registration',
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
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css',
})
export class UserRegistrationComponent {
  userService = inject(UserService);
  router = inject(Router);

  registrationStatus: { success: boolean; message: string } = {
    success: false,
    message: 'Not attempted yet',
  };

  roles: Role[] = [
    {value: 'STUDENT', viewValue: 'STUDENT'},
    {value: 'TEACHER', viewValue: 'TEACHER'},
  ];

  form = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      role: new FormControl('', Validators.required),
    },
    this.passwordConfirmValidator,
  );

  passwordConfirmValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return {};
  }

  onSubmit(value: any) {
    // if (this.form.value.role === "TEACHER") {
    //   this.router.navigate(['/register-teacher']);
    // } else if (this.form.value.role === "STUDENT") {
    //   this.router.navigate(['/register-student']);
    // }
    console.log(value);

    const user = this.form.value as User;
    delete user['confirmPassword'];

    this.userService.registerUser(user).subscribe({
      next: (response) => {
        console.log('User registered', response);
        this.registrationStatus = { success: true, message: "Success" };
        const token = response.access_token;
      },
      error: () => {
        
        console.log('Error registering user', "Error");
        this.registrationStatus = { success: false, message: "Error" };
      },
    });
  }

  registerAnotherUser() {
    this.form.reset();
    this.registrationStatus = { success: false, message: 'Not attempted yet' };
  }
}
