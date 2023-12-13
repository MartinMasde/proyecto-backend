import mongoose, { Document, Schema, Model, model } from "mongoose";

interface IUser extends Document {
  id: number;
  name: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
  