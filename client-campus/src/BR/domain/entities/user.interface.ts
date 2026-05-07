import type { Role } from "./role.interface";
import type { Subject } from "./subject.interface";

export interface User{
    id_user:string;
    name: string;
    last_name: string;
    e_mail?: string | null;
    contact_number?: string | null;
    description?: string | null;
    image?: string | null;
    is_demo_user?: boolean;
    Role?: Role | null;
    subjects: Subject[];
    enrolledSubjects: Subject[];
    token?: string;
    id_role?: string | null;
}
