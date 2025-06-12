import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  auth0Id: string;
  email: string;
  name: string;
  picture?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  favoriteShops: string[];
  role: 'user' | 'partner' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    auth0Id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    favoriteShops: [{ type: String }],
    role: { 
      type: String, 
      enum: ['user', 'partner', 'admin'], 
      default: 'user' 
    },
  },
  { timestamps: true }
);

// Prevent duplicate model compilation error in development due to hot reloading
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
