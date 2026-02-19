import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  imageUrl: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    imageUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

const User = models.User || model<IUser>('User', UserSchema);

export default User;
