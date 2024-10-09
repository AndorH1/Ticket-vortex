export interface User {
  id: string;
  photo: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
  role: UserType | undefined;
  country: string;
  city: string;
  password: string;
  username: string;
  verified: boolean;
}
export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
}
export type UserList = User[];
