export enum gender {
  male = "male",
  female = "female",
  others = "others",
}

export enum userRole {
  user = "user",
  admin = "admin",
}

export enum accountStatus {
  active = "active",
  deactive = "deactive",
  suspended = "suspended",
}

export interface ErrorType {
  message: string | Array<Record<string, string>>;
}

export interface AuthRegisterBody {
  email: string;
  password: string;
}

export interface AuthLoginBody {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  email: string;
  id: number;
  tel: string | null;
  name: string | null;
  gender: gender | null;
  age: number | null;
  profilePicture: string | null;
  token: string;
}

export interface AuthEmailAvailabilityBody {
  email: string;
}
