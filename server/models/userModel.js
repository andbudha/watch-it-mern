import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nickName: { type: String, required: true, unique: true },
    avatar: { type: String },
    avatarPublicID: { type: String },
    movieList: [{ type: Schema.Types.ObjectId, ref: 'movie' }],
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model('user', userSchema);
export default UserModel;
