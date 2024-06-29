import { Component, Input, OnInit, inject } from '@angular/core';
import { Teacher } from 'src/app/shared/interfaces/teacher';
import { Course } from 'src/app/shared/interfaces/course';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-teacher-courses',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './teacher-courses.component.html',
  styleUrl: './teacher-courses.component.css'
})
export class TeacherCoursesComponent implements OnInit {
  teacherService = inject(TeacherService);
  courseService = inject(CourseService);
  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  courses: Course[];
  teacher: Teacher;

  @Input() course: Course | undefined;

  ngOnInit(): void {
    const teacherId = this.route.snapshot.params['id'];
    this.teacherService.getCourses(teacherId).subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching courses:', error.message);
      }
    });
    this.teacherService.getTeacherById(teacherId).subscribe({
      next: (teacher) => {
        this.teacher = teacher;
      },
      error: (error) => {
        console.error('Error fetching teacher:', error);
      }
    });
  }

  removeCourse(course: Course) {
    const teacherId = this.route.snapshot.params['id'];
    this.teacherService.removeCourse(teacherId, course.id).subscribe({
      next: () => {
        this.courses = this.courses.filter(course => course !== course);
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting course:', error.message);
      }
    });
  }

  addCourse(teacher: Teacher) {
    this.router.navigate(['/teacher-add-course/', teacher.id])
  }

  goBack() {
    this.router.navigate(['/teacher-table']);
  }
}
