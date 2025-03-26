import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid Email.' }),
  username: z.string().min(3, { message: 'Username must have at least 3 characters' }),
  password: z.string().min(6, { message: 'Password must have at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Confirm Password must have at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
})

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid Email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
})
