export interface LoginCredentials {
  e_mail: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  last_name: string;
}
