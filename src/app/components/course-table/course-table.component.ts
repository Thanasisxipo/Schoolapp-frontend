import { Component, Input, OnInit, inject } from '@angular/core';
import { Course } from 'src/app/shared/interfaces/course';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { CourseService } from 'src/app/shared/services/course.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-course-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './course-table.component.html',
  styleUrl: './course-table.component.css'
})
export class CourseTableComponent implements OnInit {
  courseService = inject(CourseService);
  userService = inject(UserService);
  courses: Course[] = [];
  router = inject(Router);

  @Input() course: Course | undefined;

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching courses:', error.message);
      }
    });
  }

  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course).subscribe({
      next: () => {
        this.courses = this.courses.filter(course => course.id !== course.id);
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting course:', error.message);
        // Handle the error as needed
      }
    });
  }

  updateCourse(course: Course) {
    this.router.navigate(['/update-course', course.id]);
  };
  
  goBack() {
    if (this.userService.getRole() === "ADMIN") {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/teacher-dashboard']);
    }
  }
   
  insertCourse() {
    this.router.navigate(['insert-course']);
  }
}
