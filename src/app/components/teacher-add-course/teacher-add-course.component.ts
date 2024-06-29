import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Teacher } from 'src/app/shared/interfaces/teacher';
import { TeacherService } from 'src/app/shared/services/teacher.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from 'src/app/shared/interfaces/course';
import { CourseService } from 'src/app/shared/services/course.service';

@Component({
  selector: 'app-teacher-add-course',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './teacher-add-course.component.html',
  styleUrl: './teacher-add-course.component.css'
})
export class TeacherAddCourseComponent implements OnInit {
  teacherService = inject(TeacherService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  courseService = inject(CourseService);
  teacher: Teacher;
  courses: Course[];

  form = new FormGroup ({
    course: new FormControl(null, Validators.required)
  })

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching courses:', error.message);
      }
    });
    const teacherId = this.route.snapshot.params['id'];
    this.teacherService.getTeacherById(teacherId).subscribe({
      next: (teacher) => {
        this.teacher = teacher;
      },
      error: (error) => {
        console.error('Error fetching teacher:', error);
      }
    });
  }

  addCourse() {
    if (this.form.valid) {
      const teacherId = this.route.snapshot.params['id'];
      const courseToAdd = this.courses.find(course => course.id === this.form.value.course);
      if (courseToAdd) {
        this.teacherService.addCourse(teacherId, courseToAdd.id).subscribe({
          next: () => {
            console.log('Course added successfully');
            this.router.navigate(['/teacher-courses', this.teacher.id]); 
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error adding course:', error.message);
          }
        });
      } else {
        console.error('Course not found:', this.form.value.course);
      }
    }
  }

  goBack() {
    this.router.navigate(['/teacher-courses', this.teacher.id]); 
  }
}
