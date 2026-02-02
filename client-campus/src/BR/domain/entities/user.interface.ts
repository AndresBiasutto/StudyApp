import type { Role } from "./role.interface";
import type { Subject } from "./subject.interface";

export interface User{
    id_user:string;
    name: string;
    last_name: string;
    e_mail: string;
    contact_number: string;
    description: string;
    image: string;
    Role: Role
    subjects: Subject[] | [];
    enroledSubjects: Subject[] | [];
}