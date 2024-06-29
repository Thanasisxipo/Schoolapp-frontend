import { User } from "./user";
import { Speciality } from "./speciality";
import { Course } from "./course";

export interface Teacher {
    id: number
    firstname: string;
    lastname: string;
    ssn: string;
    email: string;
    speciality: Speciality;
    user: User;
    courses: Course[];
}

export interface TeacherToRegister {
    id: number
    firstname: string;
    lastname: string;
    ssn: string;
    email: string;
    username: string;
    password: string;
    role: "TEACHER";
}