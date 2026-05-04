export interface DemoAccount {
  role: "student" | "teacher" | "admin";
  title: string;
  email: string;
  password: string;
  description: string;
  highlights: string[];
}
