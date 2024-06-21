import mongoose from 'mongoose';
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: { type: String },
  year: { type: Number },
  cast: [{ type: String }],
  genres: [{ type: String }],
  commentaries: [{ type: Schema.Types.Mixed }, { timestamps: true }],
  href: { type: String },
  extract: { type: String },
  thumbnail: { type: String },
  thumbnail_width: { type: Number },
  thumbnail_height: { type: Number },
});

const MovieModel = mongoose.model('movie', movieSchema);
export default MovieModel;
