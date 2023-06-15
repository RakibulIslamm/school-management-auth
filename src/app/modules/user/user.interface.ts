import { Model } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface UserInterface {
  id?: string;
  role: string;
  password?: string;
}

export type UserModel = Model<UserInterface, Record<string, unknown>>;
