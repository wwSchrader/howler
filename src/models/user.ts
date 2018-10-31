import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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

const User = mongoose.model('User', userSchema);
export default User;
