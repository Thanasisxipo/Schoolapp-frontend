import { Teacher } from "./teacher";

export interface Course {
    id: number
    courseName: string;
    teacher: Teacher;
    students: [];
}
