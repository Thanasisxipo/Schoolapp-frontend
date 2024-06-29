import { Course } from "./course";
import { City } from "./city";
import { User } from "./user";

export interface Student {
    id: number
    firstname: string;
    lastname: string;
    gender: string;
    email: string
    city: City;
    user: User;
    courses: Course[];
}

export interface StudentToRegister {
    id: number
    firstname: string;
    lastname: string;
    gender: string;
    email: string;
    username: string;
    password: string;
    role: "STUDENT";
}