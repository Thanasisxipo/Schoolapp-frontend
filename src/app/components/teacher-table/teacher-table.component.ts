import { Component, Input, OnInit, inject } from '@angular/core';
import { Teacher } from 'src/app/shared/interfaces/teacher';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './teacher-table.component.html',
  styleUrl: './teacher-table.component.css'
})
export class TeacherTableComponent implements OnInit {
  teacherService = inject(TeacherService);
  teachers: Teacher[] = [];
  router = inject(Router);

  @Input() teacher: Teacher | undefined;

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching teachers:', error.message);
        
      }
    });
  }

  deleteTeacher(teacher: Teacher) {
    this.teacherService.deleteTeacher(teacher).subscribe({
      next: () => {
        this.teachers = this.teachers.filter(teacher => teacher !== teacher);
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting teacher:', error.message);
        // Handle the error as needed
      }
    });
  }

  updateTeacher(teacher: Teacher) {
    this.router.navigate(['/update-teacher', teacher.id]);
  };
  
  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }
   
  insertTeacher() {
    this.router.navigate(['insert-teacher']);
  }

  getCourses(teacher: Teacher) {
    this.router.navigate(['/teacher-courses', teacher.id]);
  };
}
