import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { Course } from 'src/app/shared/interfaces/course';
import { CourseService } from 'src/app/shared/services/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-insert-course',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './insert-course.component.html',
  styleUrl: './insert-course.component.css'
})
export class InsertCourseComponent implements OnInit {
  courseService = inject(CourseService);
  router = inject(Router);
  course: Course;
  form = new FormGroup ({
    name: new FormControl('', Validators.required)
  })

ngOnInit(): void {
  
}

  insertCourse() {
    if (this.form.valid) {
      const newCourse: Course = {
        courseName: this.form.value.name, // Ensure this matches the course interface
        id: 0,
        teacher: undefined,
        students: []
      };
      this.courseService.addCourse(newCourse).subscribe({
        next: () => {
          console.log('Course inserted successfully');
          this.router.navigate(['../course-table']); // Navigate to course table after insertion
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error inserting course:', error.message);
          // Handle the error as needed
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['../course-table']);
  }

}
