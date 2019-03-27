import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  authentication: string;
}

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
  },
  authentication: {
    local: {
      password: String,
    },
  },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
