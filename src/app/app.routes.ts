import { Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { CityTableComponentComponent } from './components/city-table/city-table.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { authGuard } from './shared/guards/auth.guard';
import { ListMenuComponent } from './components/list-menu/list-menu.component';
import { CourseTableComponent } from './components/course-table/course-table.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { SpecialityTableComponent } from './components/speciality-table/speciality-table.component';
import { TeacherTableComponent } from './components/teacher-table/teacher-table.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UpdateCityComponent } from './components/update-city/update-city.component';
import { InsertCityComponent } from './components/insert-city/insert-city.component';
import { UpdateCourseComponent } from './components/update-course/update-course.component';
import { InsertCourseComponent } from './components/insert-course/insert-course.component';
import { UpdateSpecialityComponent } from './components/update-speciality/update-speciality.component';
import { InsertSpecialityComponent } from './components/insert-speciality/insert-speciality.component';
import { UpdateStudentComponent } from './components/update-student/update-student.component';
import { InsertStudentComponent } from './components/insert-student/insert-student.component';
import { UpdateTeacherComponent } from './components/update-teacher/update-teacher.component';
import { InsertTeacherComponent } from './components/insert-teacher/insert-teacher.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { InsertUserComponent } from './components/insert-user/insert-user.component';
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';
import { TeacherRegistrationComponent } from './components/teacher-registration/teacher-registration.component';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { TeacherCoursesComponent } from './components/teacher-courses/teacher-courses.component';
import { TeacherAddCourseComponent } from './components/teacher-add-course/teacher-add-course.component';

export const routes: Routes = [
    // { path: '', redirectTo: 'login'},
    { path: 'login', component: UserLoginComponent },
    { path: 'register', component: UserRegistrationComponent},
    { path: 'register-teacher', component: TeacherRegistrationComponent},
    { path: 'register-student', component: StudentRegistrationComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent, data:{expectedRole: 'ADMIN'}, canActivate: [authGuard]},
    { path: 'student-dashboard', component: StudentDashboardComponent, data:{expectedRole: 'STUDENT'}, canActivate: [authGuard]},
    { path: 'teacher-dashboard', component: TeacherDashboardComponent, data:{expectedRole: 'TEACHER'}, canActivate: [authGuard]},
    { path: 'list-menu', component: ListMenuComponent},
    { path: 'city-table', component: CityTableComponentComponent},
    { path: 'course-table', component: CourseTableComponent},
    { path: 'speciality-table', component: SpecialityTableComponent},
    { path: 'student-table', component: StudentTableComponent},
    { path: 'teacher-table', component: TeacherTableComponent},
    { path: 'user-table', component: UserTableComponent},
    { path: 'update-city/:id', component: UpdateCityComponent},
    { path: 'insert-city', component: InsertCityComponent},
    { path: 'insert-course', component: InsertCourseComponent},
    { path: 'update-course/:id', component: UpdateCourseComponent},
    { path: 'insert-speciality', component: InsertSpecialityComponent},
    { path: 'update-speciality/:id', component: UpdateSpecialityComponent},
    { path: 'insert-student', component: InsertStudentComponent},
    { path: 'update-student/:id', component: UpdateStudentComponent},
    { path: 'insert-teacher', component: InsertTeacherComponent},
    { path: 'update-teacher/:id', component: UpdateTeacherComponent},
    { path: 'insert-user', component: InsertUserComponent},
    { path: 'update-user/:id', component: UpdateUserComponent},
    { path: 'student-courses/:id', component: StudentCoursesComponent},
    { path: 'teacher-courses/:id', component: TeacherCoursesComponent},
    { path: 'add-course/:id', component: AddCourseComponent},
    { path: 'teacher-add-course/:id', component: TeacherAddCourseComponent}
];
