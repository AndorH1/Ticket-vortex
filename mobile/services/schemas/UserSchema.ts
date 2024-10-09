import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  photo: z.string(),
  username: z.string(),
  role: z.string(),
  phoneNumber: z.string(),
  country: z.string(),
  city: z.string(),
  address: z.string(),
  verified: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;

export const UserRegisterSchema = z.object({
  firstName: z.string().min(3, { message: 'First name must contain minimum 3 characters' }),
  lastName: z.string().min(3, { message: 'Last name must contain minimum 3 characters' }),
  username: z.string().min(5, { message: 'Username must contain minimum 5 characters' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(5, { message: 'Password must contain minimum 5 characters' }),
});

export type UserRegister = z.infer<typeof UserRegisterSchema>;
