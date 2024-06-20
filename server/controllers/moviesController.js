import MovieModel from '../models/movieModel.js';
import UserModel from '../models/userModel.js';

const fetchMovies = async (req, res) => {
  try {
    const movies = await MovieModel.find();
    res.status(200).json({ message: 'Movies fetched!', movies });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addMovieToMyList = async (req, res) => {
  console.log(req.body);
  const movieID = req.body.movieID;
  const userID = '6672b97cb0573d266042c1a9';
  try {
    const user = await UserModel.findByIdAndUpdate(
      { _id: userID },
      { $push: { movieList: movieID } }
    );
    res.status(200).json({ user, message: 'Movie added to my list!' });
  } catch (error) {
    res.status(500).json({ error, message: 'Adding movie to my list failed!' });
  }
};

const removeMovieFromMyList = async (req, res) => {
  try {
    res.status(200).json({ message: 'Movie removed successfully!' });
  } catch (error) {
    res
      .status(500)
      .json({ error, message: 'Removing movie from my list failed!' });
  }
};

const fetchMyMovieList = async (req, res) => {
  console.log(req);
  const userID = req.params.userID;
  try {
    const user = await UserModel.findById({
      _id: userID,
    }).populate('movieList');
    const movieList = user.movieList;
    console.log(movieList);
    res.status(200).json(movieList);
  } catch (error) {
    res.status(500).json({ error, message: 'Fetching my movie-list failed!' });
  }
};

export {
  fetchMovies,
  addMovieToMyList,
  removeMovieFromMyList,
  fetchMyMovieList,
};
