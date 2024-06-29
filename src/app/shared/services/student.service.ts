import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Student, StudentToRegister } from '../interfaces/student';
import { Router } from '@angular/router';
import { Course } from '../interfaces/course';
import { CourseService } from './course.service';

const API_URL = `${environment.apiURL}/api/`;

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  courseService = inject(CourseService);

  constructor() { 
  }

  addStudent(student: Student) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.post<Student>(`${API_URL}students/`, student, { headers });
  }

  updateStudent(student: Student) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = student.id;
    return this.http.put<Student>(`${API_URL}students/${id}`, student, { headers });
  }

  deleteStudent(student: Student) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const id = student.id
    return this.http.delete<Student>(`${API_URL}students/${id}`, { headers });
  }
  
  getStudentById(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Student>(`${API_URL}students/${id}`, { headers });
  }

  getStudents() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Student[]>(`${API_URL}students/`, { headers });
  }

  registerStudent(student: StudentToRegister) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.post<Student>(`${API_URL}register-student`, student, { headers });
  }

  addCourse(studentId: number, courseId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    const course = this.courseService.getCourseById(courseId);
    return this.http.put<Student>(`${API_URL}students/${studentId}/courses/${courseId}`,course, { headers });
  }

  removeCourse(studentId: number, courseId: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.delete<Student>(`${API_URL}students/${studentId}/courses/${courseId}`,  { headers });
  }

  getCourses(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<Course[]>(`${API_URL}students/${id}/courses`,  { headers });
  }
}
