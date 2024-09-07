import { z } from 'zod';

export const UserResponseSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  maidenName: z.string(),
  age: z.number(),
  gender: z.enum(['male', 'female']),
  email: z.string().email(),
  phone: z.string(),
  username: z.string(),
  password: z.string(),
  birthDate: z.string(),
  image: z.string().url(),
  bloodGroup: z.string(),
  height: z.number(),
  weight: z.number(),
  eyeColor: z.string(),
  hair: z.object({
    color: z.string(),
    type: z.string(),
  }),
  ip: z.string(),
  address: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    stateCode: z.string(),
    postalCode: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
    country: z.string(),
  }),
  macAddress: z.string(),
  university: z.string(),
  bank: z.object({
    cardExpire: z.string(),
    cardNumber: z.string(),
    cardType: z.string(),
    currency: z.string(),
    iban: z.string(),
  }),
  company: z.object({
    department: z.string(),
    name: z.string(),
    title: z.string(),
    address: z.object({
      address: z.string(),
      city: z.string(),
      state: z.string(),
      stateCode: z.string(),
      postalCode: z.string(),
      coordinates: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
      country: z.string(),
    }),
  }),
  ein: z.string(),
  ssn: z.string(),
  userAgent: z.string(),
  crypto: z.object({
    coin: z.string(),
    wallet: z.string(),
    network: z.string(),
  }),
  role: z.string(),
});

export type UserResponseModel = z.infer<typeof UserResponseSchema>;
