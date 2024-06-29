import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Teacher, TeacherToRegister } from '../interfaces/teacher';
import { Router } from '@angular/router';
import { CourseService } from './course.service';
import { Course } from '../interfaces/course';

const API_URL = `${environment.apiURL}/api/`;

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  courseService = inject(CourseService);

  constructor() {
   
  }

  addTeacher(teacher: Teacher) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.post<Teacher>(`${API_URL}teachers/`, teacher, { headers });
  }

  updateTeacher(teacher: Teacher) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = teacher.id;
    return this.http.put<Teacher>(`${API_URL}teachers/${id}`, teacher, { headers });
  }

  deleteTeacher(teacher: Teacher) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = teacher.id
    return this.http.delete<Teacher>(`${API_URL}teachers/${id}`, { headers });
  }

  getTeacherById(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Teacher>(`${API_URL}teachers/${id}`, { headers });
  }

  getTeachers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Teacher[]>(`${API_URL}teachers/`, { headers });
  }

  registerTeacher(teacher: TeacherToRegister) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.post<Teacher>(`${API_URL}register-teacher`, teacher, { headers });
  }

  addCourse(teacherId: number, courseId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const course = this.courseService.getCourseById(courseId);
    return this.http.put<Teacher>(`${API_URL}teachers/${teacherId}/courses/${courseId}`,course, { headers });
  }

  removeCourse(studentId: number, courseId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.delete<Teacher>(`${API_URL}teachers/${studentId}/courses/${courseId}`,  { headers });
  }

  getCourses(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Course[]>(`${API_URL}teachers/${id}/courses`,  { headers });
  }
  

}
