export interface ISignUp {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "customer";
}
export interface ISignIn {
  email: string;
  password: string;
}
