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

export enum language {
  en = "en",
  fa = "fa",
}

export interface ErrorType {
  message: string | Array<Record<string, string>>;
}
export interface AuthLoginBody {
  email: string;
  password: string;
}
export interface AuthLoginResponse {
  email: string;
  id: number;
  tel: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: gender | null;
  birthday: Date | null;
  profilePicture: string | null;
  token: string;
  language: language | null;
}
export interface AuthRegisterBody {
  email: string;
  password: string;
}
export type AuthRegisterResponse = AuthLoginResponse;
export interface AuthEmailAvailabilityBody {
  email: string;
}
export interface UserUpdateBody {
  tel?: string;
  firstName?: string;
  lastName?: string;
  gender?: gender;
  age?: Date;
}
export type UserUpdateResponse = Omit<AuthLoginResponse, "token">;
