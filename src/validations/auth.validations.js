import z from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2, 'Name is required').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  password: z.string().min(6, 'Password must be at least 6 characters long').max(50, 'Password must be less than 50 characters'),
  role: z.enum(['user', 'admin','owner']).default('user'),
});


export const signinSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  password: z.string().min(6, 'Password must be at least 6 characters long').max(50, 'Password must be less than 50 characters'),
});