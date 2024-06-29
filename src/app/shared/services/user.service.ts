import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Credentials, LoggedInUser, User } from '../interfaces/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

const API_URL = `${environment.apiURL}/api`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  user = signal<LoggedInUser | null>(null);

  constructor() {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      try {
        const decodedToken = jwtDecode<{ sub: string, role: string }>(access_token);
        this.user.set({
          username: decodedToken.sub,
          role: decodedToken.role,
        });

        // Redirect based on role if token is valid and user is set
        this.redirectUser(decodedToken.role);
      } catch (error) {
        console.error('Token Decoding Error:', error);
        localStorage.removeItem('access_token');
      }
    }

    // Log user status changes
    effect(() => {
      const currentUser = this.user();
      if (!currentUser) {
        console.log('No user logged in');
      } else {
        console.log('User logged in:', currentUser.username);
      }
    });
  }

  loginUser(credentials: Credentials) {
    return this.http.post<{ access_token: string }>(`${API_URL}/login/`, credentials);
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


  logoutUser() {
    this.user.set(null);
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }

  registerUser(user: User) {
    return this.http.post<{ access_token: string }>(`${API_URL}/register/`, user);
  }

  addUser(user: User) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.post<User>(`${API_URL}/users/`, user, { headers });
  }

  updateUser(user: User) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = user.id;
    return this.http.put<User>(`${API_URL}/users/${id}`, user, { headers });
  }

  deleteUser(user: User) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = user.id
    return this.http.delete<User>(`${API_URL}/users/${id}`, { headers });
  }

  getUserByUsername(username: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<User>(`${API_URL}/users/${username}`, { headers });
  }

  getUsers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<User[]>(`${API_URL}/users/`, { headers });
  }

  getUserById(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<User>(`${API_URL}/users/by-id/${id}`, { headers });
  }

  getRole() {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwtDecode<{ sub: string, role: string }>(token);
        this.user.set({
          username: decodedToken.sub,
          role: decodedToken.role,
        });
      return this.user().role;
    }
    return false; 
  }

  getUsername() : string {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwtDecode<{ sub: string, role: string }>(token);
        this.user.set({
          username: decodedToken.sub,
          role: decodedToken.role,
        });
      return this.user().username;
    }
    return null; 
  }

  async getUserId(): Promise<number> {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwtDecode<{ sub: string, role: string }>(token);
      this.user.set({
        username: decodedToken.sub,
        role: decodedToken.role,
      });
      const username = this.user().username;
      try {
        const user = await this.getUserByUsername(username).toPromise();
        return user.id;
      } catch (error) {
        console.error('Error fetching user by username:', error);
        return null;
      }
    }
    return null;
  }
}
