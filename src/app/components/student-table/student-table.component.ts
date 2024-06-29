import { Component, Input, OnInit, inject } from '@angular/core';
import { Student } from 'src/app/shared/interfaces/student';
import { City } from 'src/app/shared/interfaces/city';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentService } from 'src/app/shared/services/student.service';
import { CityService } from 'src/app/shared/services/city.service';
import { Router, RouterLink } from '@angular/router';
import { Gender } from 'src/app/shared/interfaces/gender';

@Component({
  selector: 'app-student-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.css'
})
export class StudentTableComponent implements OnInit {
  studentService = inject(StudentService);
  students: Student[] = [];
  cityService= inject(CityService);
  router = inject(Router);
  city: City;

  @Input() student: Student | undefined;

  genders: Gender[] = [
    {value: 'M', viewValue: 'MALE'},
    {value: 'F', viewValue: 'FEMALE'}
  ];

  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching students:', error.message);
      }
    });
  }

  deleteStudent(student: Student) {
    this.studentService.deleteStudent(student).subscribe({
      next: () => {
        this.students = this.students.filter(student => student !== student);
        this.ngOnInit();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting student:', error.message);
        // Handle the error as needed
      }
    });
  }

  updateStudent(student: Student) {
    this.router.navigate(['/update-student', student.id]);
  };
  
  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }
   
  insertStudent() {
    this.router.navigate(['insert-student']);
  }

  getCity(id: number) {
    this.cityService.getCityById(id).subscribe({
      next: (city: City) => {
        return this.city = city;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching city:', error.message);
      }
    });
  }

  getGenderViewValue(gender: string): string {
    const foundGender = this.genders.find(g => g.value === gender);
    return foundGender ? foundGender.viewValue : '';
  }

  getCourses(student: Student) {
    this.router.navigate(['/student-courses', student.id]);
  };
  
}
