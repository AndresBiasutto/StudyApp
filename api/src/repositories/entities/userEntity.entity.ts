export interface UserEntity {
  id_user: string;
  name: string;
  last_name: string;
  description?: string;
  contact_number?: string;
  e_mail: string;
  image?: string;
  Role?: {
    id_role: number;
    name: string;
  };
}