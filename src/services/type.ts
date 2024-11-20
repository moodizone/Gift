export enum gender {
  male = "male",
  female = "female",
  others = "others"
}

export enum userRole {
  user = "user",
  admin = "admin"
}

export enum accountStatus {
  active = "active",
  deactive = "deactive",
  suspended = "suspended"
}

export interface UserCreateBody {
  email: string;
  password: string;
  age?: number;
  gender?: gender;
  name?: string;
  role?: userRole;
  tel?: string;
}

export interface UserCreateResponse {
  email: string;
  age: number | null;
  gender: gender | null;
  name: string | null;
  profilePicture: string | null;
  tel: string | null;
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