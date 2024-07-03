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
  try {
    const user = await UserModel.findById({
      _id: req.params.userID,
    }).populate('movieList');
    const movieList = user.movieList;
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

const fetchCommentaries = async (req, res) => {
  try {
    const movie = await MovieModel.find({ _id: req.params.movieID });
    res
      .status(200)
      .json({ message: 'Commentaries successfully fetched!', movie });
  } catch (error) {
    res.status(500).json({ error, message: 'Fetching commentaries failed!' });
  }
};

const addCommentary = async (req, res) => {
  try {
    const movie = await MovieModel.findByIdAndUpdate(
      { _id: req.body.movieID },
      { $push: { commentaries: req.body.newCommentary } },
      { new: true }
    );
    res.status(200).json({ message: 'Commentary successfully added!', movie });
  } catch (error) {
    res.status(500).json({ error, message: 'Commentary adding failed!' });
  }
};

const editCommentary = async (req, res) => {
  try {
    const movie = await MovieModel.findByIdAndUpdate(
      {
        _id: req.body.movieID,
      },
      {
        $set: {
          'commentaries.$[outer].commentary': req.body.editedCommentary,
        },
      },
      {
        arrayFilters: [{ 'outer.commentaryID': req.body.commentaryID }],
        new: true,
      }
    );
    res.status(200).json({ message: 'Commentary successfully edited!', movie });
  } catch (error) {
    res.status(500).json({ error, message: 'Commentary editing failed!' });
  }
};

const deleteCommentary = async (req, res) => {
  console.log(req.body);
  try {
    const movie = await MovieModel.findByIdAndUpdate(
      { _id: req.body.movieID },
      { $pull: { commentaries: { commentaryID: req.body.commentaryID } } },
      { new: true }
    );
    res
      .status(200)
      .json({ message: 'Commentary successfully deleted!', movie });
  } catch (error) {
    res.status(500).json({ error, message: 'Deleting commentary failed!' });
  }
};

const addLike = async (req, res) => {
  try {
    const movie = await MovieModel.findByIdAndUpdate(
      { _id: req.body.movieID },
      { $push: { likes: req.body.userID } },
      { new: true }
    );
    res.status(200).json({ message: 'Like added!', movie });
    return;
  } catch (error) {
    console.log('Liking error:::', error);
    res.status(500).json({ error, message: 'Leaving a like failed!' });
  }
};

export {
  fetchMovies,
  addMovieToMyList,
  removeMovieFromMyList,
  fetchMyMovieList,
  addCommentary,
  fetchCommentaries,
  deleteCommentary,
  editCommentary,
  addLike,
};
