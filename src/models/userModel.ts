import mongoose, { Document, Schema, Model, model } from "mongoose";

interface IUser extends Document {
  name: string;
  password: string;
  email: string;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true}
});

const User: Model<IUser> = model<IUser>("User", userSchema);

export default User;
  