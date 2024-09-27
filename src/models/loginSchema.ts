import { z } from 'zod';

const safeStringRegex = /^[^<>/\\]*$/;

export const LoginRequestSchema = z.object({
  username: z
    .string()
    .min(3, 'Username is required')
    .regex(safeStringRegex, 'Username contains invalid characters'),
  password: z
    .string()
    .min(6, 'Password is required')
    .regex(safeStringRegex, 'Password contains invalid characters'),
  expiresInMins: z.number().optional().default(1),
});

export type LoginRequestModel = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.enum(['male', 'female']),
  image: z.string().url(),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginResponseModel = z.infer<typeof LoginResponseSchema>;
