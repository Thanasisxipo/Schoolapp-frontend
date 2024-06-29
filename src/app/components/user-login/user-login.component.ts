import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Credentials, LoggedInUser } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  userService = inject(UserService);
  router = inject(Router);
  
  invalidLogin = false;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    const credentials = this.form.value as Credentials;
    this.userService.loginUser(credentials).subscribe({
      next: (response) => {
        console.log('Full Response:', response);
        const accessToken = response.access_token;
        console.log('Access Token:', accessToken);

        try {
          localStorage.setItem('access_token', accessToken);
          const decodedToken = jwtDecode<{ sub: string, role: string }>(accessToken);

          this.userService.user.set({
            username: decodedToken.sub,
            role: decodedToken.role,
          });

          // Redirect based on role
          this.redirectUser(decodedToken.role);
        } catch (error) {
          console.error('Token Decoding Error:', error);
          this.invalidLogin = true;
          localStorage.removeItem('access_token');
        }
      },
      error: (error) => {
        console.error('Login Error:', error);
        this.invalidLogin = true;
      },
    });
  }

  private redirectUser(role: string) {
    if (role === 'ADMIN') {
      this.router.navigate(['admin-dashboard']);
    } else if (role === 'TEACHER') {
      this.router.navigate(['teacher-dashboard']);
    } else if (role === 'STUDENT') {
      this.router.navigate(['student-dashboard']);
    } else {
      this.router.navigate(['login']);
    }
  }
}