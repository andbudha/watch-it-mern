import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentarySchema = new Schema(
  {
    commentaryID: { type: String, required: true, unique: true },
    movieID: { type: String, required: true },
    userID: { type: String, required: true },
    avatar: { type: String },
    nickName: { type: String },
    commentary: { type: String, required: true },
    _id: 0,
  },
  { timestamps: true }
);

const movieSchema = new Schema({
  title: { type: String },
  year: { type: Number },
  cast: [{ type: String }],
  genres: [{ type: String }],
  likes: [{ type: String }],
  dislikes: [{ type: String }],
  commentaries: [commentarySchema],
  href: { type: String },
  extract: { type: String },
  thumbnail: { type: String },
  thumbnail_width: { type: Number },
  thumbnail_height: { type: Number },
});

const MovieModel = mongoose.model('movie', movieSchema);
export default MovieModel;
