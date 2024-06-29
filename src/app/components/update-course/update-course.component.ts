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
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/shared/interfaces/course';
import { CourseService } from 'src/app/shared/services/course.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-course',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})
export class UpdateCourseComponent implements OnInit{
  ccourseService = inject(CourseService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  course: Course;
  form = new FormGroup ({
    courseName: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    const courseId = this.route.snapshot.params['id'];
    this.ccourseService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.course = course;
        this.form.patchValue({ courseName: course.courseName });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching course:', error.message);
      }
    });
  }

  updateCourse() {
    if (this.form.valid) {
      this.course.courseName = this.form.value.courseName;
      this.ccourseService.updateCourse(this.course).subscribe({
        next: () => {
          this.router.navigate(['/course-table']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating course:', error.message);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/course-table']);
  }
}
