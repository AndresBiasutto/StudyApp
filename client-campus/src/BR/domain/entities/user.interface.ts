import type { Role } from "./role.interface";
import type { Subject } from "./subject.interface";

export interface User{
    id:number;
    name: string;
    last_name: string;
    e_mail: string;
    contactNumber: string;
    image: string;
    Role: Role
    createdSubjects: Subject[] | [];
    enroledSubjects: Subject[] | [];
}