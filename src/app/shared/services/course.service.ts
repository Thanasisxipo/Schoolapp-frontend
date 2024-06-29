import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Course } from '../interfaces/course';
import { Router } from '@angular/router';
import { LoggedInUser } from '../interfaces/user';
import { jwtDecode } from 'jwt-decode';

const API_URL = `${environment.apiURL}/api/courses`;

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router)

  constructor() { 
  }

  addCourse(course: Course) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.post<Course>(`${API_URL}/`, course, { headers });
  }

  updateCourse(course: Course) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = course.id;
    return this.http.put<Course>(`${API_URL}/${id}`, course, { headers });
  }

  deleteCourse(course: Course) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = course.id
    return this.http.delete<Course>(`${API_URL}/${id}`, { headers });
  }

  getCourseById(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Course>(`${API_URL}/${id}`, { headers });
  }

  getCourses() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Course[]>(`${API_URL}/`, { headers });
  }
}
