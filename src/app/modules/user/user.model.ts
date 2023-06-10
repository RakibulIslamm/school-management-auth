import { Model, Schema, model } from 'mongoose'
import { UserInterface } from './user.interface'

type UserModel = Model<UserInterface, object>

const userSchema = new Schema<UserInterface>(
  {
    id: { type: String, unique: true },
    role: { type: String, required: true },
    password: { type: String },
  },
  { timestamps: true }
)

const userModel = model<UserInterface, UserModel>('User', userSchema)
export default userModel
