import { Component, Input, OnInit, inject } from '@angular/core';
import { Student } from 'src/app/shared/interfaces/student';
import { Course } from 'src/app/shared/interfaces/course';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentService } from 'src/app/shared/services/student.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './student-courses.component.html',
  styleUrl: './student-courses.component.css'
})
export class StudentCoursesComponent implements OnInit {
  studentService = inject(StudentService);
  courseService = inject(CourseService);
  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  courses: Course[];
  student: Student;

  @Input() course: Course | undefined;

  ngOnInit(): void {
    const studentId = this.route.snapshot.params['id'];
    this.studentService.getCourses(studentId).subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching courses:', error.message);
      }
    });
    this.studentService.getStudentById(studentId).subscribe({
      next: (student) => {
        this.student = student;
      },
      error: (error) => {
        console.error('Error fetching student:', error);
      }
    });
  }

  removeCourse(course: Course) {
    const studentId = this.route.snapshot.params['id'];
    this.studentService.removeCourse(studentId, course.id).subscribe({
      next: () => {
        this.courses = this.courses.filter(course => course !== course);
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting course:', error.message);
        // Handle the error as needed
      }
    });
  }

  addCourse(student: Student) {
    this.router.navigate(['/add-course/', student.id])
  }

  goBack() {
    this.router.navigate(['/student-table']);
  }
}
