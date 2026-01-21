export interface RegisterFormData {
  firstName: string;
  lastName: string;
  e_mail: string;
  password: string;
  confirmPassword: string;
  [key: string]: string;
}