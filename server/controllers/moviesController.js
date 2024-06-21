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

const fetchMyMovieList = async (req, res) => {
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

const addMovieToMyList = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      { _id: req.body.userID },
      { $push: { movieList: req.body.movieID } },
      { new: true }
    );
    res.status(200).json({ user, message: 'Movie added to your list!' });
  } catch (error) {
    res
      .status(500)
      .json({ error, message: 'Adding movie to your list failed!' });
  }
};

const removeMovieFromMyList = async (req, res) => {
  console.log(req.body);
  try {
    const user = await UserModel.findByIdAndUpdate(
      { _id: req.body.userID },
      { $pull: { movieList: req.body.movieID } },
      { new: true }
    );
    res.status(200).json({ message: 'Movie removed successfully!', user });
  } catch (error) {
    res
      .status(500)
      .json({ error, message: 'Removing movie from your list failed!' });
  }
};

export {
  fetchMovies,
  addMovieToMyList,
  removeMovieFromMyList,
  fetchMyMovieList,
};
