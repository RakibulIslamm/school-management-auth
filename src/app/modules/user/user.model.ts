import { Schema, model } from 'mongoose';
import { UserInterface, UserModel } from './user.interface';

const userSchema = new Schema<UserInterface>(
  {
    id: { type: String, unique: true, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const userModel = model<UserInterface, UserModel>('User', userSchema);
export default userModel;
