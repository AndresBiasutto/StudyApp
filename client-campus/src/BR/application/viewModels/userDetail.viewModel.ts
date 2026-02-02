import { Subject } from "../../domain/entities/subject.interface";

export interface UserDetail {
  id: string;
  image?: string;
  name: string;
  last_name: string;
  e_mail: string;
  contact_number?: string;
  description?: string;
  role?: string;
  subjects: Subject[]
}
