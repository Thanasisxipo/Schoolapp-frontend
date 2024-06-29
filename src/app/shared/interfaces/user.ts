import { Teacher } from "./teacher";
import { Student } from "./student";

export interface User {
    id: number
    username: string;
    password: string;
    role: string;
    teacher: Teacher;
    student: Student;
}

export interface Credentials {
    username: string;
    password: string;
}

export interface LoggedInUser {
    username: string;
    role: string;
  }