import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from 'src/app/shared/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { Student, StudentToRegister } from 'src/app/shared/interfaces/student';
import { StudentService } from 'src/app/shared/services/student.service';
import { Gender } from 'src/app/shared/interfaces/gender';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.css'
})
export class StudentRegistrationComponent {
  studentService = inject(StudentService);
  router = inject(Router);
  studentToRegister: StudentToRegister;

  genders: Gender[] = [
    {value: 'M', viewValue: 'MALE'},
    {value: 'F', viewValue: 'FEMALE'}
  ];

  registrationStatus: { success: boolean; message: string } = {
    success: false,
    message: 'Not attempted yet',
  };
  
  form = new FormGroup ({
    username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    gender: new FormControl,
    email: new FormControl('', Validators.required)
  },this.passwordConfirmValidator );

  passwordConfirmValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return {};
  };

  onSubmit(value: any) {
    console.log(value);

    const student = this.form.value as StudentToRegister;
    delete student['confirmPassword'];

    this.studentService.registerStudent(student).subscribe({
      next: (response) => {
        console.log('Student registered', response);
        this.registrationStatus = { success: true, message: "Success" };
        // const token = response.access_token;
      },
      error: () => {
        
        console.log('Error registering user', "Error");
        this.registrationStatus = { success: false, message: "Error" };
      },
    });
    };
  

  registerAnotherUser() {
    this.form.reset();
    this.registrationStatus = { success: false, message: 'Not attempted yet' };
  };
}
