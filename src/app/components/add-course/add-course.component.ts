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
import { Student } from 'src/app/shared/interfaces/student';
import { StudentService } from 'src/app/shared/services/student.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from 'src/app/shared/interfaces/course';
import { CourseService } from 'src/app/shared/services/course.service';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit {
  studentService = inject(StudentService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  courseService = inject(CourseService);
  student: Student;
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
    const studentId = this.route.snapshot.params['id'];
    this.studentService.getStudentById(studentId).subscribe({
      next: (student) => {
        this.student = student;
      },
      error: (error) => {
        console.error('Error fetching student:', error);
      }
    });
  }

  addCourse() {
    if (this.form.valid) {
      const studentId = this.route.snapshot.params['id'];
      const courseToAdd = this.courses.find(course => course.id === this.form.value.course);
      if (courseToAdd) {
        this.studentService.addCourse(studentId, courseToAdd.id).subscribe({
          next: () => {
            console.log('Course added successfully');
            this.router.navigate(['/student-courses']); 
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
    this.router.navigate(['/student-courses', this.student.id]); 
  }
}
